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
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import { Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"

const VehicleDetailsModal = ({ open, onClose, vehicle, onEdit, onDelete }) => {
  const theme = useTheme()

  if (!vehicle) return null

  // Format date
  const date = vehicle.createdAt.toDate();
  const formattedDate = date.toLocaleDateString('pt-BR');

  const photoTypes = [
    { id: "front", label: "Frente" },
    { id: "side", label: "Lateral" },
    { id: "back", label: "Traseira" },
    { id: "interior", label: "Interior" },
    { id: "trunk", label: "Porta-malas" },
  ]

  // Opções para tempo de posse
  const ownershipTimeMap = {
    "less_than_6_months": "Menos de 6 meses",
    "6_to_12_months": "6 meses a 1 ano",
    "1_to_3_years": "1 a 3 anos",
    "3_to_5_years": "3 a 5 anos",
    "more_than_5_years": "Mais de 5 anos"
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: theme.palette.background.primary }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          {vehicle?.brand?.nome} {vehicle.model} ({vehicle.year})
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3, bgcolor: theme.palette.background.default }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  Marca
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {vehicle?.brand?.nome}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  Modelo
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {vehicle.model}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  Ano
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {vehicle.year}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  Placa
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {vehicle.plate}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  Quilometragem
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {vehicle.mileage} km
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  Tempo de posse
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {ownershipTimeMap[vehicle.ownershipTime] || vehicle.ownershipTime}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.primary">
                  Adicionado em
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formattedDate}
                </Typography>
              </Box>
            </Box>
          </Grid>

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
                      label={item} 
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

          {/* Main photo - larger */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Frente
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
              }}
            />
          </Grid>

          {/* Other photos - smaller */}
          {photoTypes.slice(1).map((type) => (
            <Grid key={type.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography variant="subtitle2" gutterBottom>
                  {type.label}
                </Typography>
                <Box
                  component="img"
                  src={vehicle.photos[type.id]}
                  alt={`${vehicle?.brand?.nome} ${vehicle.model} - ${type.label}`}
                  sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 1,
                    flexGrow: 1,
                  }}
                />
              </Box>
            </Grid>
          ))}
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
    </Dialog>
  )
}

export default VehicleDetailsModal;