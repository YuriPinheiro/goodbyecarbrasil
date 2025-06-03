import { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  IconButton,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material"
import ProfileModal from "../../ProfileModal";

const VehicleDetailsModal = ({ open, onClose, vehicle, onEdit, onDelete, view }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const theme = useTheme();
  const modalRef = useRef(null);

  if (!vehicle) return null;

  // Format date
  const date = vehicle.createdAt.toDate();
  const formattedDate = date.toLocaleDateString('pt-BR');

  const photoTypes = [
    { id: "front", label: "Frente", description: "Foto diretamente da frente do veículo" },
    { id: "side", label: "Lateral", description: "Foto lateral do veículo (use também as diagonais)" },
    { id: "back", label: "Traseira", description: "Foto diretamente da traseira do veículo" },
    { id: "trunk", label: "Porta-malas", description: "Foto do porta-malas aberto" },
    { id: "engine", label: "Motor", description: "Foto do compartimento do motor com o capô aberto" },
    { id: "Km", label: "Quilometragem", description: "Foto do contador de quilometros do veículo" },
    { id: "diagonalFrontLeft", label: "Diagonal frontal - lado 1", description: "Foto diagonal frontal do lado do motorista" },
    { id: "diagonalFrontRight", label: "Diagonal frontal - lado 2", description: "Foto diagonal frontal do lado do passageiro" },
    { id: "diagonalRearLeft", label: "Diagonal traseira - lado 1", description: "Foto diagonal traseira do lado do motorista" },
    { id: "diagonalRearRight", label: "Diagonal traseira - lado 2", description: "Foto diagonal traseira do lado do passageiro" },
    { id: "backSeat", label: "Banco traseiro", description: "Foto dos bancos traseiros do veículo" },
    { id: "damage1", label: "Avarias - Foto 1 (Opcional)", description: "Foto de avarias ou danos no veículo" },
    { id: "damage2", label: "Avarias - Foto 2 (Opcional)", description: "Foto de avarias ou danos no veículo" },
    { id: "damage3", label: "Avarias - Foto 3 (Opcional)", description: "Foto de avarias ou danos no veículo" }
  ];

  const vehicleItems = {
    air_conditioning: { label: "Ar condicionado" },
    spare_key: { label: "Chave reserva" },
    electric_windows: { label: "Vidros elétricos" },
    hydraulic_steering: { label: "Direção hidráulica" },
    electric_steering: { label: "Direção elétrica" },
    assisted_steering: { label: "Direção assistida" },
    airbag: { label: "Air bag" },
    dual_airbag: { label: "Air bag duplo" },
    alarm: { label: "Alarme" },
    heater: { label: "Ar quente" },
    electric_seats: { label: "Bancos elétricos" },
    leather_seats: { label: "Bancos em couro" },
    reverse_camera: { label: "Câmera de ré" },
    onboard_computer: { label: "Computador de bordo" },
    traction_control: { label: "Controle de tração" },
    stability_control: { label: "Controle de estabilidade" },
    rear_defroster: { label: "Desembaçador traseiro" },
    fog_lights: { label: "Farol neblina" },
    abs_brakes: { label: "Freios ABS" },
    ebd_brakes: { label: "Freios EBD" },
    interface: { label: "Interface" },
    rear_wiper: { label: "Limpador traseiro" },
    tonneau_cover: { label: "Lona marítima" },
    bed_liner: { label: "Protetor de caçamba" },
    electric_mirrors: { label: "Retrovisores elétricos" },
    alloy_wheels: { label: "Rodas liga leve" },
    parking_sensor: { label: "Sensor de estacionamento" },
    sunroof: { label: "Teto solar" },
    electric_locks: { label: "Travas elétricas" },
    turbo: { label: "Turbo" },
    green_windows: { label: "Vidros verdes" },
    height_adjustable_steering: { label: "Volante com regulagem de altura" },
    multimedia_center: { label: "Central multimídia" },
    reverse_sensor: { label: "Sensor de ré" }
  };

  const ownershipTimeMap = {
    "less_than_6_months": "Menos de 6 meses",
    "6_to_12_months": "6 meses a 1 ano",
    "1_to_3_years": "1 a 3 anos",
    "3_to_5_years": "3 a 5 anos",
    "more_than_5_years": "Mais de 5 anos"
  }

  // Mapeamento de condições
  const conditionMap = {
    "excellent": "Excelente",
    "good": "Bom",
    "regular": "Regular",
    "bad": "Ruim"
  };

  // Função para baixar imagem
  const handleDownloadImage = (imageUrl, imageName) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `${vehicle.brand?.nome}_${vehicle.model}_${imageName}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg" // Aumentei para lg para melhor visualização das fotos
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          maxHeight: "90vh",
        },
        ref: modalRef
      }}
    >
      {/* Cabeçalho do modal */}
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: theme.palette.background.primary }}>
        <Grid container justifyContent={'center'} sx={{ justifyContent: "center", alignItems: "center" }}>
          <Grid item size={11}>
            <Typography variant="h6" component="div" fontWeight="bold">
              {vehicle?.brand?.nome} {vehicle.model} ({vehicle.year})
            </Typography>
          </Grid>
          <Grid item size={1}>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.text.primary,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3, bgcolor: theme.palette.background.default }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 4, md: 6 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Marca
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle?.brand?.nome}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 8, md: 6 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Modelo
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.model}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Ano (Fabricação/Modelo)
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.year + "/" + vehicle.modelYear}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Placa
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.plate}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Quilometragem
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {vehicle.mileage} km
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Tempo de posse
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {ownershipTimeMap[vehicle.ownershipTime] || vehicle.ownershipTime}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.primary">
                      Adicionado em
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formattedDate}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

            </Box>
          </Grid>

          {/* NOVA SEÇÃO: ESTADOS DO VEÍCULO */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Estados do Veículo
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Pintura
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {conditionMap[vehicle.paintCondition] || vehicle.paintCondition || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Mecânica
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {conditionMap[vehicle.mechanicalCondition] || vehicle.mechanicalCondition || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Interior
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {conditionMap[vehicle.interiorCondition] || vehicle.interiorCondition || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    Pneus
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {conditionMap[vehicle.tiresCondition] || vehicle.tiresCondition || "Não informado"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {vehicle.user && (
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1 }} />
              <Box>
                <Typography variant="subtitle2" color="text.primary" gutterBottom>
                  Proprietário
                </Typography>

                <Button
                  sx={{ color: theme.palette.text.primary }}
                  onClick={() => { setProfileOpen(true); }}
                >
                  {vehicle?.user?.name}
                </Button>
              </Box>
            </Grid>
          )}

          {vehicle.description && (
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1 }} />
              <Box>
                <Typography variant="subtitle2" color="text.primary" gutterBottom>
                  Descrição
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {vehicle.description}
                </Typography>
              </Box>
            </Grid>
          )}

          {vehicle.items?.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1 }} />
              <Box>
                <Typography variant="subtitle2" color="text.primary" gutterBottom>
                  Itens do veículo
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {vehicle.items.map(item => (
                    <Chip
                      key={item}
                      label={vehicleItems[item].label}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.getContrastText(theme.palette.primary.light)
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="title" fontWeight="bold" gutterBottom>
              Fotos do Veículo
            </Typography>
          </Grid>

          {/* Foto principal (frente) */}
          <Grid item xs={12}>
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Foto Principal - Frente
              </Typography>
              <Box
                component="img"
                src={vehicle.photos.front}
                alt={`${vehicle?.brand?.nome} ${vehicle.model} - Frente`}
                sx={{
                  width: "100%",
                  maxHeight: 400,
                  objectFit: "contain",
                  borderRadius: 1,
                  boxShadow: 3,
                }}
              />
              <Tooltip title="Baixar imagem">
                <IconButton
                  onClick={() => handleDownloadImage(vehicle.photos.front, 'frente')}
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    }
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          {/* Other photos - smaller */}
          {/* Grid de fotos secundárias */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Galeria de Fotos
            </Typography>
            <Grid container spacing={2}>
              {photoTypes.slice(1)
                .filter(type => vehicle.photos[type.id] && vehicle.photos[type.id] !== "")
                .map((type) => (
                  <Grid item key={type.id} xs={12} sm={6} md={4} lg={3}>
                    <Box sx={{
                      position: 'relative',
                      height: '100%',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1,
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: 2,
                        transform: 'scale(1.02)',
                        transition: 'all 0.3s ease',
                      }
                    }}>
                      <Box
                        component="img"
                        src={vehicle.photos[type.id]}
                        alt={`${vehicle?.brand?.nome} ${vehicle.model} - ${type.label}`}
                        sx={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                        }}
                      />
                      <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        p: 1,
                      }}>
                        <Typography variant="body2">{type.label}</Typography>
                      </Box>
                      <Tooltip title="Baixar imagem">
                        <IconButton
                          onClick={() => handleDownloadImage(vehicle.photos[type.id], type.label.toLowerCase().replace(/\s+/g, '_'))}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(0,0,0,0.7)',
                            }
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, bgcolor: theme.palette.background.default }}>
        <Button
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          sx={{
            color: theme.palette.error.main,
            mr: "auto",
          }}
        >
          Excluir
        </Button>
        {/* Novo botão de compartilhar */}
        {/* {view &&
          <Button
            startIcon={<ShareIcon />}
            onClick={handleShare}
            sx={{
              color: theme.palette.primary.main,
            }}
          >
            Compartilhar
          </Button>
        } */}
        <Button
          onClick={onClose}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          Fechar
        </Button>
        <Button
          startIcon={<EditIcon />}
          onClick={onEdit}
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#15d5c9",
            },
          }}
        >
          Editar
        </Button>
      </DialogActions>
      <ProfileModal open={profileOpen} onClose={() => { setProfileOpen(false); }} userProvider={{ ...vehicle.user, uid: vehicle.user?.id }} mode={'view'} />

    </Dialog>
  )
}

export default VehicleDetailsModal;