import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Link,
    InputAdornment,
    IconButton,
    Divider,
    Checkbox,
    useTheme,
    FormControlLabel,
    Alert,
    CircularProgress
} from "@mui/material";
import Grid from "@mui/material/Grid2"
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Person,
    Phone
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    AuthErrorCodes
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../stores/FirebaseStore";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: name === "acceptTerms" ? checked : value,
        });
        // Limpa erros quando o usuário começa a digitar
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validação do nome
        if (!formData.name.trim()) {
            newErrors.name = "Nome é obrigatório";
            isValid = false;
        }

        // Validação do email
        if (!formData.email) {
            newErrors.email = "Email é obrigatório";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email inválido";
            isValid = false;
        }

        // Validação da senha
        if (!formData.password) {
            newErrors.password = "Senha é obrigatória";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Senha deve ter pelo menos 6 caracteres";
            isValid = false;
        }

        // Validação de confirmação de senha
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "As senhas não coincidem";
            isValid = false;
        }

        // Validação dos termos
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = "Você deve aceitar os termos e condições";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: formData.name,
                email: user.email,
                phone: formData.phone,
                termsAccepted: formData.acceptTerms,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
            });

            navigate("/login", {
                state: {
                    registrationSuccess: true,
                    email: formData.email
                }
            });

        } catch (error) {
            console.error("Erro ao criar usuário:", error);

            // Tratamento de erros específicos do Firebase
            switch (error.code) {
                case AuthErrorCodes.EMAIL_EXISTS:
                    setError("Este email já está em uso. Tente fazer login.");
                    setErrors({ ...errors, email: "Email já cadastrado" });
                    break;
                case AuthErrorCodes.INVALID_EMAIL:
                    setError("Email inválido. Verifique e tente novamente.");
                    setErrors({ ...errors, email: "Email inválido" });
                    break;
                case AuthErrorCodes.WEAK_PASSWORD:
                    setError("Senha muito fraca. Use pelo menos 6 caracteres.");
                    setErrors({ ...errors, password: "Senha muito fraca" });
                    break;
                default:
                    setError("Ocorreu um erro ao criar sua conta. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{ marginTop: 8, marginBottom: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 2, bgcolor: "background.default" }}>
                    <Typography component="h1" variant="h5" color="text.primary" fontWeight="bold" align="center">
                        Crie sua conta
                    </Typography>
                    <Typography variant="body2" color="text.primary" align="center">
                        Preencha os dados abaixo para se registrar
                    </Typography>

                    {/* Adição do Alert para erros */}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box noValidate>
                        <Grid container spacing={2}>
                            {[
                                { label: "Nome completo", name: "name", icon: <Person sx={{ color: theme.palette.primary.main }} /> },
                                { label: "Email", name: "email", icon: <Email sx={{ color: theme.palette.primary.main }} /> },
                                { label: "Telefone", name: "phone", icon: <Phone sx={{ color: theme.palette.primary.main }} /> },
                            ].map(({ label, name, icon }) => (
                                <Grid key={name} size={{ xs: 12 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        id={name}
                                        label={label}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        error={!!errors[name]}
                                        helperText={errors[name]}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                                        }}
                                        sx={{ "& label": { color: "black" }, "& .MuiInputBase-root": { color: "black" } }}
                                    />
                                </Grid>
                            ))}

                            {[
                                { label: "Senha", name: "password", show: showPassword, setShow: setShowPassword },
                                { label: "Confirmar senha", name: "confirmPassword", show: showConfirmPassword, setShow: setShowConfirmPassword },
                            ].map(({ label, name, show, setShow }) => (
                                <Grid key={name} size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        name={name}
                                        label={label}
                                        type={show ? "text" : "password"}
                                        id={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        error={!!errors[name]}
                                        helperText={errors[name]}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock sx={{ color: theme.palette.primary.main }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShow(!show)} edge="end">
                                                        {show ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ "& label": { color: "black" }, "& .MuiInputBase-root": { color: "black" } }}
                                    />
                                </Grid>
                            ))}

                            <Grid size={{ xs: 12 }}>
                                <FormControlLabel
                                    control={<Checkbox
                                        name="acceptTerms"
                                        sx={{
                                            color: theme.palette.background.paper,
                                            '&.Mui-checked': {
                                                color: theme.palette.primary.main,
                                            },
                                        }}
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                    />}
                                    label={
                                        <Typography variant="body2">
                                            Eu aceito os <Link href="/termos-e-condicoes" underline="hover">Termos e Condições</Link>
                                        </Typography>
                                    }
                                />
                                {errors.acceptTerms && (
                                    <Typography variant="caption" color="error" display="block">
                                        {errors.acceptTerms}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        {/* Adição do loading no botão */}
                        <Button
                            onClick={handleRegister}
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Registrar"
                            )}
                        </Button>

                        <Divider sx={{ my: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                ou
                            </Typography>
                        </Divider>

                        <Typography variant="body2" color="text.primary" align="center">
                            Já tem uma conta?{' '}
                            <Link component={RouterLink} to="/login" sx={{ fontWeight: "bold" }}>
                                Faça login
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default RegisterPage;