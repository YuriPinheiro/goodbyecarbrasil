import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Avatar,
    Typography,
    Divider,
    IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import userService from '../stores/UserService';

const ProfileModal = ({ open, onClose, userProvider }) => {
    const [user, setUser] = useState({});
    const [phone, setPhone] = React.useState(user?.phoneNumber || '');
    const [displayPhone, setDisplayPhone] = React.useState('');
    const theme = useTheme();

    useEffect(() => {
        if(open){
            getUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useEffect(() => {
        console.log(user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        // Aplica a máscara quando o phone é carregado
        if (phone) {
            setDisplayPhone(formatPhone(phone));
        }
    }, [phone]);

    const getUser = async () => {
        const user = await userService.getUserByUid(userProvider.uid);
        setUser(user);
        setPhone(user.phone || '');
    }

    const formatPhone = (value) => {
        // Remove tudo que não é dígito
        const cleaned = value.replace(/\D/g, '');
        
        // Aplica a máscara conforme o tamanho
        if (cleaned.length <= 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    };

    const handlePhoneChange = (event) => {
        const input = event.target.value;
        // Remove todos os caracteres não numéricos
        const cleaned = input.replace(/\D/g, '');
        
        // Atualiza o estado com apenas números (para armazenamento)
        setPhone(cleaned);
        
        // Atualiza o valor exibido com a máscara
        setDisplayPhone(formatPhone(input));
    };

    const handleSave = () => {
        userService.updateUserPhone(userProvider.uid, phone);
        onClose();
    };

    return (
        <Dialog open={open} PaperProps={{ sx: { backgroundColor: theme.palette.background.default } }} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Meu Perfil</Typography>
                    <IconButton onClick={onClose} color="inherit">
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Avatar
                        sx={{ width: 80, height: 80, mb: 2 }}
                        src={userProvider?.photoURL}
                    />
                    <Typography variant="h6">{user?.name}</Typography>
                    <Typography variant="body2" color="text.primary">{user?.email}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box mt={2}>
                    <TextField
                        label="Nome"
                        value={user?.name || ''}
                        fullWidth
                        margin="normal"
                        disabled
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />

                    <TextField
                        label="Email"
                        value={user?.email || ''}
                        fullWidth
                        margin="normal"
                        disabled
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />

                    <TextField
                        label="Telefone"
                        value={displayPhone}
                        onChange={handlePhoneChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="(99) 99999-9999"
                        inputProps={{
                            maxLength: 15 // Tamanho máximo com máscara
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    disabled={phone === (user?.phone || '')}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileModal;