import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Alert,
  Snackbar,
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import { useAuth } from "../../contexts/AuthContext";
import {
  Add as AddIcon,
  Dashboard as DashboardIcon,
  DirectionsCar as CarIcon,
} from "@mui/icons-material"
import VehicleCard from "./vehicles/VehicleCard"
import VehicleFormModal from "./vehicles/VehicleFormModal"
import VehicleDetailsModal from "./vehicles/VehiclesDetail"
import DeleteConfirmationModal from "./vehicles/DeleteModal"
import useStyles from "../../styles/dashboard/dashboard"
import { useMenu } from "../../contexts/MenuContext";
import { deleteVehicle, getVehiclesByUser } from "../../stores/VeihcleService";
import userService from "../../stores/UserService";
import AdminVehiclesPage from "./AdminVehiclesPage";

const Dashboard = () => {
  const theme = useTheme()
  const { isExpanded } = useMenu();
  const classes = useStyles();
  const [vehicles, setVehicles] = useState([])
  const [activeTab, setActiveTab] = useState('Meus Veículos'); // Estado para controlar a aba ativa

  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  // Modal states
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [feedbackAlert, setFeedbackAlert] = useState(null);

  useEffect(() => {
    if (activeTab === 'Meus Veículos') {
      getVehicles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if(user){
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getUserData = async () => {
      
      const userData = await userService.getUserByUid(user.uid);
      //Phone
      setIsAdmin(userData.isAdmin);
  }

  const getVehicles = async () => {
    try {
      const vehicles = await getVehiclesByUser(user.uid);
      setVehicles(vehicles);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    }
  };

  const handleAddVehicle = () => {
    setSelectedVehicle(null)
    setIsEditing(false)
    setFormModalOpen(true)
  }

  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle)
    setDetailsModalOpen(true)
  }

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsEditing(true)
    setFormModalOpen(true)
  }

  const handleDeleteVehicle = (vehicle) => {
    setSelectedVehicle(vehicle)
    setDeleteModalOpen(true)
  }

  const confirmDeleteVehicle = async () => {
    if (!selectedVehicle) return;

    try {
      await deleteVehicle(user.uid, selectedVehicle.id);
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedVehicle(null);
      getVehicles();
    }
  };

  const handleSaveVehicle = () => {
    getVehicles();
    setFormModalOpen(false)
  }

  const onFeedback = (feedback) => {
    setFeedbackAlert(feedback);
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getMenuItems = () => {
    const baseItems = [
      { icon: <CarIcon />, label: 'Meus Veículos' }
    ];
    
    if (isAdmin) {
      return [
        { icon: <DashboardIcon />, label: 'Dashboard' },
        ...baseItems
      ];
    }
    
    return baseItems;
  };


  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            <AdminVehiclesPage />
          </>
        ); // Componente para o conteúdo do Dashboard
      case 'Meus Veículos':
        return (
          <>
            <Box className={classes.pageHeader}>
              <Typography variant="h5" fontWeight="bold" color="text.primary">
                Meus Veículos
              </Typography>
              {!(vehicles.length === 0) &&
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddVehicle}
                  className={classes.addButton}
                >
                  Adicionar Veículo
                </Button>
              }
            </Box>

            {vehicles.length === 0 ? (
              <Box className={classes.emptyState}>
                <CarIcon className={classes.emptyStateIcon} />
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Nenhum veículo cadastrado
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3, maxWidth: 400 }}>
                  Você ainda não cadastrou nenhum veículo. Clique no botão abaixo para adicionar seu primeiro veículo.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddVehicle}
                  className={classes.addButton}
                >
                  Adicionar Veículo
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {vehicles.map(vehicle => (
                  <Grid key={vehicle.id} xs={12} sm={6} md={4} lg={3}>
                    <VehicleCard
                      vehicle={vehicle}
                      onView={() => handleViewVehicle(vehicle)}
                      onEdit={() => handleEditVehicle(vehicle)}
                      onDelete={() => handleDeleteVehicle(vehicle)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box className={classes.root}>
      {/* Menu Lateral Fixo */}
      <Box className={classes.sidebar} style={{ width: isExpanded ? 240 : 68 }}>
        <Box className={classes.sidebarContent}>
          <List>
            {getMenuItems().map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={activeTab === item.label}
                  onClick={() => handleTabChange(item.label)}
                  sx={{
                    padding: theme.spacing(2),
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.action.selected,
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 'auto',
                    color: 'inherit',
                    mr: isExpanded ? 2 : 'auto'
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  {isExpanded && (
                    <ListItemText primary={item.label} />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Main content */}
      <Box component="main" className={classes.mainContent} style={{ marginLeft: isExpanded ? 240 : 68 }}>
        {renderContent()}
      </Box>

      {/* Modals - Eles só aparecem quando a aba "Meus Veículos" está ativa */}
      {activeTab === 'Meus Veículos' && (
        <>
          <VehicleFormModal
            open={formModalOpen}
            onClose={() => setFormModalOpen(false)}
            onSave={handleSaveVehicle}
            onFeedback={onFeedback}
            vehicle={isEditing ? selectedVehicle : null}
            isEditing={isEditing}
            userId={user.uid}
          />

          <VehicleDetailsModal
            open={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            vehicle={selectedVehicle}
            onEdit={() => {
              setDetailsModalOpen(false)
              handleEditVehicle(selectedVehicle)
            }}
            onDelete={() => {
              setDetailsModalOpen(false)
              handleDeleteVehicle(selectedVehicle)
            }}
          />

          <DeleteConfirmationModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDeleteVehicle}
            vehicleName={selectedVehicle ? `${selectedVehicle?.brand?.nome} ${selectedVehicle.model} (${selectedVehicle.year})` : ""}
          />
        </>
      )}

      <Snackbar
        open={Boolean(feedbackAlert)}
        autoHideDuration={3000}
        onClose={() => {
          setFeedbackAlert(null);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={feedbackAlert?.severity}>
          {feedbackAlert?.text}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Dashboard