import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import LaunchIcon from "@mui/icons-material/Launch";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveIcon from "@mui/icons-material/Save";

import RichTextEditor from "../components/RichTextEditor";
import { htmlToPlainText, sanitizeHtml } from "../lib/html";
import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import {
  createInfoArticle,
  deleteInfoArticle,
  fetchInfoArticles,
  type InfoArticleRecord,
  updateInfoArticle,
} from "./reservationSupabase";

const blankLoginForm = {
  email: "",
  password: "",
};

const blankProfileForm = {
  profileId: "",
  displayName: "",
  contact: "",
};

const blankArticleForm = {
  id: "",
  title: "",
  summary: "",
  url: "",
  contentHtml: "",
  isPublished: true,
  sortOrder: 0,
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

export default function InfoHubPage() {
  const {
    authSession,
    profile,
    loading,
    authLoading,
    error,
    message,
    isConfigured,
    setError,
    setMessage,
    login,
    logout,
    saveProfile,
    requestPasswordReset,
  } = useEmployeeAuth();
  const [loginForm, setLoginForm] = useState(blankLoginForm);
  const [profileForm, setProfileForm] = useState(blankProfileForm);
  const [articles, setArticles] = useState<InfoArticleRecord[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articleSaving, setArticleSaving] = useState(false);
  const [articleForm, setArticleForm] = useState(blankArticleForm);
  const [showEditor, setShowEditor] = useState(false);

  const isAdmin = Boolean(profile?.is_admin);

  const visibleProfileForm =
    profileForm.profileId === (profile?.id ?? "")
      ? profileForm
      : {
          profileId: profile?.id ?? "",
          displayName: profile?.display_name ?? "",
          contact: profile?.contact ?? "",
        };

  const loadArticles = useCallback(async () => {
    if (!authSession || !profile) return;

    setArticlesLoading(true);
    setError("");

    try {
      const rows = await fetchInfoArticles(isAdmin);
      setArticles(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load articles.");
    } finally {
      setArticlesLoading(false);
    }
  }, [authSession, profile, isAdmin, setError]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const publishedCount = useMemo(
    () => articles.filter((article) => article.is_published).length,
    [articles]
  );

  const handleLogin = async () => {
    if (!loginForm.email.trim() || !loginForm.password) {
      setError("Enter your email and password.");
      return;
    }

    try {
      await login(loginForm.email, loginForm.password);
      setLoginForm(blankLoginForm);
    } catch {
      // The auth hook places the message in the page alert.
    }
  };

  const handleProfileSave = async () => {
    if (!visibleProfileForm.displayName.trim()) {
      setError("Your name is required.");
      return;
    }

    try {
      await saveProfile(
        visibleProfileForm.displayName,
        visibleProfileForm.contact
      );
    } catch {
      // The auth hook places the message in the page alert.
    }
  };

  const startNewArticle = () => {
    setArticleForm({
      ...blankArticleForm,
      sortOrder: articles.length,
    });
    setShowEditor(true);
    setMessage("");
    setError("");
  };

  const editArticle = (article: InfoArticleRecord) => {
    setArticleForm({
      id: article.id,
      title: article.title,
      summary: article.summary ?? "",
      url: article.url ?? "",
      contentHtml: sanitizeHtml(article.content_html),
      isPublished: article.is_published,
      sortOrder: article.sort_order,
    });
    setShowEditor(true);
    setMessage("");
    setError("");
  };

  const saveArticle = async () => {
    if (!isAdmin) {
      setError("Admin access is required to edit articles.");
      return;
    }

    if (!articleForm.title.trim()) {
      setError("Article title is required.");
      return;
    }

    if (!articleForm.url.trim() && !htmlToPlainText(articleForm.contentHtml)) {
      setError("Add either a link or article content.");
      return;
    }

    setArticleSaving(true);
    setError("");
    setMessage("");

    const payload = {
      title: articleForm.title.trim(),
      summary: articleForm.summary.trim() || null,
      url: articleForm.url.trim() || null,
      content_html: sanitizeHtml(articleForm.contentHtml),
      is_published: articleForm.isPublished,
      sort_order: Number.isFinite(articleForm.sortOrder)
        ? articleForm.sortOrder
        : 0,
    };

    try {
      if (articleForm.id) {
        await updateInfoArticle(articleForm.id, payload);
        setMessage("Article updated.");
      } else {
        await createInfoArticle(payload);
        setMessage("Article created.");
      }

      setArticleForm(blankArticleForm);
      setShowEditor(false);
      await loadArticles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save article.");
    } finally {
      setArticleSaving(false);
    }
  };

  const removeArticle = async () => {
    if (!articleForm.id) return;

    const confirmed = window.confirm("Delete this article?");
    if (!confirmed) return;

    setArticleSaving(true);
    setError("");
    setMessage("");

    try {
      await deleteInfoArticle(articleForm.id);
      setMessage("Article deleted.");
      setArticleForm(blankArticleForm);
      setShowEditor(false);
      await loadArticles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete article.");
    } finally {
      setArticleSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Paper sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <CircularProgress size={24} />
            <Typography>Checking employee access...</Typography>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (!isConfigured) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Alert severity="warning">
          Supabase is not configured. Add the reservation Supabase environment
          variables before using the Info Hub.
        </Alert>
      </Container>
    );
  }

  if (!authSession) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <LockIcon color="primary" sx={{ fontSize: 34 }} />
              <Box>
                <Typography variant="h1">Info Hub</Typography>
                <Typography color="text.secondary">
                  Log in to view employee articles and important links.
                </Typography>
              </Box>
            </Stack>

            {message ? <Alert severity="success">{message}</Alert> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}

            <TextField
              label="Email"
              type="email"
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm((prev) => ({ ...prev, email: event.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleLogin();
                }
              }}
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <Button
                variant="contained"
                onClick={handleLogin}
                disabled={authLoading}
                fullWidth
              >
                {authLoading ? "Logging in..." : "Log In"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => requestPasswordReset(loginForm.email)}
                disabled={authLoading}
                fullWidth
              >
                Reset Password
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={2.5}>
            <Typography variant="h1">Create Your Profile</Typography>
            <Typography color="text.secondary">
              Add your name before viewing employee articles.
            </Typography>
            {message ? <Alert severity="success">{message}</Alert> : null}
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              label="Name"
              value={visibleProfileForm.displayName}
              onChange={(event) =>
                setProfileForm((prev) => ({
                  ...prev,
                  profileId: authSession.user.id,
                  displayName: event.target.value,
                }))
              }
              fullWidth
            />
            <TextField
              label="Contact"
              value={visibleProfileForm.contact}
              onChange={(event) =>
                setProfileForm((prev) => ({
                  ...prev,
                  profileId: authSession.user.id,
                  contact: event.target.value,
                }))
              }
              fullWidth
            />
            <Button
              variant="contained"
              onClick={handleProfileSave}
              disabled={authLoading}
            >
              {authLoading ? "Saving..." : "Save Profile"}
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
      <Stack spacing={2.5}>
        <Paper sx={{ p: { xs: 2, md: 3 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <ArticleIcon color="primary" sx={{ fontSize: 38 }} />
              <Box>
                <Typography variant="h1">Info Hub</Typography>
                <Typography color="text.secondary">
                  Important employee links and articles.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Chip label={profile.display_name} color="success" />
              <Chip label={isAdmin ? "Admin" : "Employee"} />
              <Chip label={`${publishedCount} published`} variant="outlined" />
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={logout}
                disabled={authLoading}
              >
                Log Out
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {message ? <Alert severity="success">{message}</Alert> : null}
        {error ? <Alert severity="error">{error}</Alert> : null}

        {articlesLoading ? <LinearProgress /> : null}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: isAdmin && showEditor ? "minmax(0, 1fr) 460px" : "1fr",
            },
            gap: 2,
            alignItems: "start",
          }}
        >
          <Stack spacing={2}>
            {isAdmin ? (
              <Paper sx={{ p: 2 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  alignItems={{ xs: "stretch", sm: "center" }}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h5">Article Manager</Typography>
                    <Typography color="text.secondary">
                      Create links or rich text articles for employees.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={startNewArticle}
                  >
                    New Article
                  </Button>
                </Stack>
              </Paper>
            ) : null}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {articles.map((article) => (
                <Card key={article.id} variant="outlined">
                  <CardContent>
                    <Stack spacing={1.25}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            {article.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Updated {formatDate(article.updated_at)}
                          </Typography>
                        </Box>
                        {!article.is_published ? (
                          <Chip label="Draft" size="small" />
                        ) : null}
                      </Stack>

                      {article.summary ? (
                        <Typography color="text.secondary">
                          {article.summary}
                        </Typography>
                      ) : null}

                      {article.content_html ? (
                        <>
                          <Divider />
                          <Box
                            sx={{
                              typography: "body2",
                              color: "text.primary",
                              "& h2": { fontSize: "1.15rem" },
                              "& h3": { fontSize: "1rem" },
                              "& a": { color: "primary.main", fontWeight: 700 },
                            }}
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(article.content_html),
                            }}
                          />
                        </>
                      ) : null}
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    {article.url ? (
                      <Button
                        component="a"
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        startIcon={<LaunchIcon />}
                      >
                        Open Link
                      </Button>
                    ) : null}
                    {isAdmin ? (
                      <Tooltip title="Edit article">
                        <IconButton onClick={() => editArticle(article)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </CardActions>
                </Card>
              ))}
            </Box>

            {!articles.length && !articlesLoading ? (
              <Paper sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h5">No articles yet</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Published articles and links will appear here.
                </Typography>
              </Paper>
            ) : null}
          </Stack>

          {isAdmin && showEditor ? (
            <Paper
              sx={{
                p: { xs: 2, md: 2.5 },
                position: { lg: "sticky" },
                top: { lg: 88 },
              }}
            >
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h5">
                    {articleForm.id ? "Edit Article" : "New Article"}
                  </Typography>
                  <Typography color="text.secondary">
                    Add a link, rich text content, or both.
                  </Typography>
                </Box>

                <TextField
                  label="Title"
                  value={articleForm.title}
                  onChange={(event) =>
                    setArticleForm((prev) => ({
                      ...prev,
                      title: event.target.value,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label="Summary"
                  value={articleForm.summary}
                  onChange={(event) =>
                    setArticleForm((prev) => ({
                      ...prev,
                      summary: event.target.value,
                    }))
                  }
                  multiline
                  minRows={2}
                  fullWidth
                />
                <TextField
                  label="Link URL"
                  value={articleForm.url}
                  onChange={(event) =>
                    setArticleForm((prev) => ({
                      ...prev,
                      url: event.target.value,
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label="Sort order"
                  type="number"
                  value={articleForm.sortOrder}
                  onChange={(event) =>
                    setArticleForm((prev) => ({
                      ...prev,
                      sortOrder: Number(event.target.value),
                    }))
                  }
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={articleForm.isPublished}
                      onChange={(event) =>
                        setArticleForm((prev) => ({
                          ...prev,
                          isPublished: event.target.checked,
                        }))
                      }
                    />
                  }
                  label={articleForm.isPublished ? "Published" : "Draft"}
                />

                <RichTextEditor
                  value={articleForm.contentHtml}
                  onChange={(contentHtml) =>
                    setArticleForm((prev) => ({ ...prev, contentHtml }))
                  }
                />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={saveArticle}
                    disabled={articleSaving}
                    fullWidth
                  >
                    {articleSaving ? "Saving..." : "Save Article"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setArticleForm(blankArticleForm);
                      setShowEditor(false);
                    }}
                    disabled={articleSaving}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Stack>

                {articleForm.id ? (
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={removeArticle}
                    disabled={articleSaving}
                  >
                    Delete Article
                  </Button>
                ) : null}
              </Stack>
            </Paper>
          ) : null}
        </Box>
      </Stack>
    </Container>
  );
}
