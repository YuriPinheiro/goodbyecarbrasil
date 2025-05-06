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
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import { Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"


const VehicleDetailsModal = ({ open, onClose, vehicle, onEdit, onDelete }) => {
  const theme = useTheme()

  if (!vehicle) return null

  // Format date
  const date = vehicle.createdAt.toDate(); // Converte para objeto Date do JavaScript
  const formattedDate = date.toLocaleDateString('pt-BR');

  const photoTypes = [
    { id: "front", label: "Frente" },
    { id: "side", label: "Lateral" },
    { id: "back", label: "Traseira" },
    { id: "interior", label: "Interior" },
    { id: "trunk", label: "Porta-malas" },
  ]

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
                  Adicionado em
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formattedDate}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="title" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Fotos do Veículo
            </Typography>
          </Grid>

          {/* Main photo - larger */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
              Frente
            </Typography>
            <Box
              component="img"
              src={vehicle.photos.front}
              alt={`${vehicle?.brand?.nome} ${vehicle.model} - Frente`}
              sx={{
                width: "100%",

                objectFit: "cover",
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

export default VehicleDetailsModal
