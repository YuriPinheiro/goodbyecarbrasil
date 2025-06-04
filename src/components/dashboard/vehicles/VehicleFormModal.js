import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  FormHelperText,
  Autocomplete,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Close as CloseIcon, CloudUpload as CloudUploadIcon, CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { uploadVehiclePhoto, addVehicle, updateVehicle, fetchCarBrands, fetchCarModels } from "../../../stores/VeihcleService";



const photoTypes = [
  { id: "front", label: "Frente", description: "Foto diretamente da frente do veículo" },
  { id: "diagonalFrontRight", label: "Diagonal frontal - lado 2", description: "Foto diagonal frontal do lado do passageiro" },
  { id: "side", label: "Lateral", description: "Foto lateral do veículo (use também as diagonais)" },
  { id: "diagonalRearRight", label: "Diagonal traseira - lado 2", description: "Foto diagonal traseira do lado do passageiro" },
  { id: "back", label: "Traseira", description: "Foto diretamente da traseira do veículo" },
  { id: "diagonalRearLeft", label: "Diagonal traseira - lado 1", description: "Foto diagonal traseira do lado do motorista" },
  { id: "diagonalFrontLeft", label: "Diagonal frontal - lado 1", description: "Foto diagonal frontal do lado do motorista" },
  { id: "engine", label: "Motor", description: "Foto do compartimento do motor com o capô aberto" },
  { id: "trunk", label: "Porta-malas", description: "Foto do porta-malas aberto" },
  { id: "Km", label: "Quilometragem", description: "Foto do contador de quilometros do veículo" },
  { id: "backSeat", label: "Banco traseiro", description: "Foto dos bancos traseiros do veículo" },
  { id: "damage1", label: "Avarias - Foto 1 (Opcional)", description: "Foto de avarias ou danos no veículo" },
  { id: "damage2", label: "Avarias - Foto 2 (Opcional)", description: "Foto de avarias ou danos no veículo" },
  { id: "damage3", label: "Avarias - Foto 3 (Opcional)", description: "Foto de avarias ou danos no veículo" }
];



// Opções de itens do veículo
const vehicleItems = [
  { id: "air_conditioning", label: "Ar condicionado" },
  { id: "spare_key", label: "Chave reserva" },
  { id: "electric_windows", label: "Vidros elétricos" },
  { id: "hydraulic_steering", label: "Direção hidráulica" },
  { id: "electric_steering", label: "Direção elétrica" },
  { id: "assisted_steering", label: "Direção assistida" },
  { id: "airbag", label: "Air bag" },
  { id: "dual_airbag", label: "Air bag duplo" },
  { id: "alarm", label: "Alarme" },
  { id: "heater", label: "Ar quente" },
  { id: "electric_seats", label: "Bancos elétricos" },
  { id: "leather_seats", label: "Bancos em couro" },
  { id: "reverse_camera", label: "Câmera de ré" },
  { id: "onboard_computer", label: "Computador de bordo" },
  { id: "traction_control", label: "Controle de tração" },
  { id: "stability_control", label: "Controle de estabilidade" },
  { id: "rear_defroster", label: "Desembaçador traseiro" },
  { id: "fog_lights", label: "Farol neblina" },
  { id: "abs_brakes", label: "Freios ABS" },
  { id: "ebd_brakes", label: "Freios EBD" },
  { id: "interface", label: "Interface" },
  { id: "rear_wiper", label: "Limpador traseiro" },
  { id: "tonneau_cover", label: "Lona marítima" },
  { id: "bed_liner", label: "Protetor de caçamba" },
  { id: "electric_mirrors", label: "Retrovisores elétricos" },
  { id: "alloy_wheels", label: "Rodas liga leve" },
  { id: "parking_sensor", label: "Sensor de estacionamento" },
  { id: "sunroof", label: "Teto solar" },
  { id: "electric_locks", label: "Travas elétricas" },
  { id: "turbo", label: "Turbo" },
  { id: "green_windows", label: "Vidros verdes" },
  { id: "height_adjustable_steering", label: "Volante com regulagem de altura" },
  { id: "multimedia_center", label: "Central multimídia" },
  { id: "reverse_sensor", label: "Sensor de ré" }
];


// Opções para tempo de posse
const ownershipTimeOptions = [
  { value: "less_than_6_months", label: "Menos de 6 meses" },
  { value: "6_to_12_months", label: "6 meses a 1 ano" },
  { value: "1_to_3_years", label: "1 a 3 anos" },
  { value: "3_to_5_years", label: "3 a 5 anos" },
  { value: "more_than_5_years", label: "Mais de 5 anos" },
];

const conditionOptions = [
  { value: "excellent", label: "Excelente" },
  { value: "good", label: "Bom" },
  { value: "regular", label: "Regular" },
  { value: "bad", label: "Ruim" },
];

const VehicleFormModal = ({ open, onClose, onSave, vehicle, isEditing, userId, onFeedback }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [modelYear, setModelYear] = useState(""); //Ano do modelo
  const [plate, setPlate] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [paintCondition, setPaintCondition] = useState("");
  const [mechanicalCondition, setMechanicalCondition] = useState("");
  const [interiorCondition, setInteriorCondition] = useState("");
  const [tiresCondition, setTiresCondition] = useState("");
  const [ownershipTime, setOwnershipTime] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [photoFiles, setPhotoFiles] = useState({});
  const fileInputsRef = useRef({});

  const [photos, setPhotos] = useState({
    front: "",
    side: "",
    back: "",
    interior: "",
    trunk: "",
    damage1: "",
    damage2: "",
    damage3: ""
  });

  const [errors, setErrors] = useState({});
  const [availableModels, setAvailableModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [availableBrands, setAvailableBrands] = useState([]);

  // Years for dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 36 }, (_, i) => (currentYear - i).toString());

  useEffect(() => {
    const loadBrands = async () => {
      if (open && availableBrands.length === 0) {
        setBrandsLoading(true);
        try {
          const brands = await fetchCarBrands();
          setAvailableBrands(brands);
        } catch (error) {
          console.error("Error loading car brands:", error);
          setErrorMessage("Erro ao carregar marcas de veículos. Por favor, tente novamente.");
        } finally {
          setBrandsLoading(false);
        }
      }
    };

    loadBrands();
  }, [open, availableBrands.length]);

  useEffect(() => {
    const loadModels = async () => {
      if (brand) {
        setModelsLoading(true);
        try {
          const models = await fetchCarModels(brand);
          setAvailableModels(models);
        } catch (error) {
          console.error(`Error loading models for ${brand}:`, error);
          setErrorMessage(`Erro ao carregar modelos da marca ${brand}. Por favor, tente novamente.`);
        } finally {
          setModelsLoading(false);
        }
      } else {
        setAvailableModels([]);
      }
    };

    loadModels();
  }, [brand]);

  useEffect(() => {
    if (vehicle && isEditing) {
      setBrand(vehicle.brand || "");
      setModel(vehicle.model || "");
      setYear(vehicle.year || "");
      setModelYear(vehicle.modelYear || "");
      setPlate(vehicle.plate || "");
      setDescription(vehicle.description || "");
      setMileage(vehicle.mileage || "");
      setPaintCondition(vehicle.paintCondition || "");
      setMechanicalCondition(vehicle.mechanicalCondition || "");
      setInteriorCondition(vehicle.interiorCondition || "");
      setTiresCondition(vehicle.tiresCondition || "");
      setOwnershipTime(vehicle.ownershipTime || "");
      setSelectedItems(vehicle.items || []);
      setPhotos(vehicle.photos || {
        front: "",
        side: "",
        back: "",
        interior: "",
        trunk: "",
        damage1: "",
        damage2: "",
        damage3: ""
      });

    } else {
      resetForm();
    }
  }, [vehicle, isEditing, open]);

  useEffect(() => {
    if (!open) {
      Object.values(photoFiles).forEach(fileData => {
        if (fileData?.previewUrl) {
          URL.revokeObjectURL(fileData.previewUrl);
        }
      });
    }
  }, [open, photoFiles]);

  useEffect(() => {
  }, [selectedItems]);

  const resetForm = () => {
    setBrand("");
    setModel("");
    setYear("");
    setModelYear("");
    setPlate("");
    setDescription("");
    setMileage("");
    setOwnershipTime("");
    setSelectedItems([]);
    setPhotos({
      front: "",
      side: "",
      back: "",
      interior: "",
      trunk: "",
      damage1: "",
      damage2: "",
      damage3: ""
    });
    setErrors({});
    setErrorMessage("");
    setPhotoFiles({});
    setUploadProgress({});
    setPaintCondition("");
    setMechanicalCondition("");
    setInteriorCondition("");
    setTiresCondition("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!brand) newErrors.brand = "Marca é obrigatória";
    if (!model) newErrors.model = "Modelo é obrigatório";
    if (!year) newErrors.year = "Ano é obrigatório";
    if (!modelYear) newErrors.modelYear = "Ano do modelo é obrigatório";
    if (!plate) newErrors.plate = "Placa é obrigatória";
    if (!mileage) newErrors.mileage = "Quilometragem é obrigatória";
    if (!ownershipTime) newErrors.ownershipTime = "Tempo de posse é obrigatório";

    // Validate all photos
    photoTypes
      .filter(type => !type.id.startsWith('damage')) // Filtra apenas as fotos obrigatórias
      .forEach(type => {
        if (!photos[type.id]) {
          newErrors[`photo_${type.id}`] = `Foto ${type.label.toLowerCase()} é obrigatória`;
        }
      });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const captureFromCamera = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment'; // Usa a câmera traseira

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);

      setPhotoFiles(prev => ({
        ...prev,
        [type]: { file, previewUrl }
      }));

      setPhotos(prev => ({
        ...prev,
        [type]: previewUrl
      }));

      if (errors[`photo_${type}`]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[`photo_${type}`];
          return newErrors;
        });
      }
    };

    input.click();
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const vehicleData = {
        brand,
        model,
        year: parseInt(year),
        modelYear: parseInt(modelYear),
        plate: plate.toUpperCase(),
        description,
        mileage: parseInt(mileage),
        ownershipTime,
        items: selectedItems,
        photos: {
          ...photos,
          damage1: photos.damage1 || null,
          damage2: photos.damage2 || null,
          damage3: photos.damage3 || null
        },
        paintCondition,
        mechanicalCondition,
        interiorCondition,
        tiresCondition
      };

      let vehicleId;
      if (isEditing) {
        vehicleId = vehicle.id;
        await updateVehicle(vehicleId, vehicleData);
      } else {
        const newVehicle = await addVehicle(userId, vehicleData);
        vehicleId = newVehicle.id;
      }

      // Upload photos if there are files
      const updatedPhotos = { ...photos };
      let hasPhotosToUpload = false;

      for (const [type, fileData] of Object.entries(photoFiles)) {
        if (fileData?.file) {
          hasPhotosToUpload = true;
          const downloadURL = await uploadVehiclePhoto(userId, vehicleId, fileData.file);
          updatedPhotos[type] = downloadURL;
          URL.revokeObjectURL(fileData.previewUrl);
        }
      }

      if (hasPhotosToUpload) {
        await updateVehicle(vehicleId, { photos: updatedPhotos });
      }

      onFeedback({ text: "Veículo salvo com sucesso!", severity: "success" });
      onSave();
      resetForm();
      onClose();
    } catch (error) {
      onFeedback({ text: "Houve um erro ao salvar o veículo!", severity: "error" });
      console.error("Error saving vehicle:", error);
      setErrorMessage("Erro ao salvar veículo. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (type, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setPhotoFiles(prev => ({
      ...prev,
      [type]: { file, previewUrl }
    }));

    setPhotos(prev => ({
      ...prev,
      [type]: previewUrl
    }));

    if (errors[`photo_${type}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`photo_${type}`];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (type, event) => {
    handleFileChange(type, event);
  };

  const handleItemToggle = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        // Impede o fechamento quando clica fora (backdrop) ou pressiona ESC
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
        onClose(); // Permite o fechamento apenas quando chamado explicitamente (como no botão de fechar)
      }}
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
          {isEditing ? "Editar Veículo" : "Adicionar Novo Veículo"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3, bgcolor: theme.palette.background.default }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={brand}
              onChange={(_, newValue) => {
                setBrand(newValue || null); // Agora pode ser null ou o objeto completo da marca
                setModel(""); // Reseta o modelo quando a marca muda
                if (newValue && errors.brand) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.brand;
                    return newErrors;
                  });
                }
              }}
              options={availableBrands}
              getOptionLabel={(option) => option?.nome || ""} // Extrai o nome para exibição
              isOptionEqualToValue={(option, value) =>
                option?.codigo === value?.codigo // Compara pelos códigos
              }
              loading={brandsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Marca"
                  required
                  error={!!errors.brand}
                  helperText={errors.brand}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {brandsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={model}
              onChange={(_, newValue) => {
                setModel(newValue || "");
                if (newValue && errors.model) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.model;
                    return newErrors;
                  });
                }
              }}
              options={availableModels}
              disabled={!brand || modelsLoading}
              loading={modelsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Modelo"
                  required
                  error={!!errors.model}
                  helperText={errors.model}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {modelsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={year}
              onChange={(_, newValue) => {
                setYear(newValue || "");
                if (newValue && errors.year) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.year;
                    return newErrors;
                  });
                }
              }}
              options={years}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ano de Fabricação"
                  required
                  error={!!errors.year}
                  helperText={errors.year}
                />
              )}
            />
          </Grid>
          {/* Ano do Modelo */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={modelYear}
              onChange={(_, newValue) => {
                setModelYear(newValue || "");
                if (newValue && errors.modelYear) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.modelYear;
                    return newErrors;
                  });
                }
              }}
              options={years}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ano do Modelo"
                  required
                  error={!!errors.modelYear}
                  helperText={errors.modelYear}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Placa"
              value={plate}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setPlate(value.replace(/[^A-Z0-9]/g, '').substring(0, 7));
                if (value && errors.plate) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.plate;
                    return newErrors;
                  });
                }
              }}
              required
              error={!!errors.plate}
              helperText={errors.plate}
              inputProps={{
                maxLength: 7,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Quilometragem"
              value={mileage}
              onChange={(e) => {
                // Remove tudo que não é dígito
                let value = e.target.value.replace(/\D/g, '');

                // Limita a 6 dígitos (999.999 km)
                value = value.slice(0, 6);

                // Formata com separador de milhar
                const formattedValue = value.length > 0
                  ? Number(value).toLocaleString('pt-BR')
                  : '';

                setMileage(formattedValue);

                // Limpa erro se existir
                if (value && errors.mileage) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.mileage;
                    return newErrors;
                  });
                }
              }}
              required
              error={!!errors.mileage}
              helperText={errors.mileage || "Máximo 999.999 km"}
              InputProps={{
                endAdornment: <Typography variant="body2">km</Typography>,
                inputProps: {
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={ownershipTime}
              onChange={(_, newValue) => {
                setOwnershipTime(newValue || "");
                if (newValue && errors.ownershipTime) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.ownershipTime;
                    return newErrors;
                  });
                }
              }}
              options={ownershipTimeOptions.map(opt => opt.value)}
              getOptionLabel={(option) =>
                ownershipTimeOptions.find(opt => opt.value === option)?.label || ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tempo de posse"
                  required
                  error={!!errors.ownershipTime}
                  helperText={errors.ownershipTime}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={paintCondition}
              onChange={(_, newValue) => {
                setPaintCondition(newValue || "");
              }}
              options={conditionOptions.map(opt => opt.value)}
              getOptionLabel={(option) =>
                conditionOptions.find(opt => opt.value === option)?.label || ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estado da pintura"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={mechanicalCondition}
              onChange={(_, newValue) => {
                setMechanicalCondition(newValue || "");
              }}
              options={conditionOptions.map(opt => opt.value)}
              getOptionLabel={(option) =>
                conditionOptions.find(opt => opt.value === option)?.label || ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estado da mecânica"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={interiorCondition}
              onChange={(_, newValue) => {
                setInteriorCondition(newValue || "");
              }}
              options={conditionOptions.map(opt => opt.value)}
              getOptionLabel={(option) =>
                conditionOptions.find(opt => opt.value === option)?.label || ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estado interior"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={tiresCondition}
              onChange={(_, newValue) => {
                setTiresCondition(newValue || "");
              }}
              options={conditionOptions.map(opt => opt.value)}
              getOptionLabel={(option) =>
                conditionOptions.find(opt => opt.value === option)?.label || ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estado dos pneus"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Descrição do veículo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              placeholder="Descreva o estado geral do veículo, histórico de manutenção, etc."
            />
          </Grid>

          {/* Seção de itens do veículo */}
          <Grid xs={12}>
            <Box
              sx={{
                p: 3,
                mt: 2,
                mb: 3,
                backgroundColor: 'background.default',
                borderRadius: 2,
                boxShadow: 1,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                }
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ color: 'text.primary' }}
              >
                Itens do Veículo
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                paragraph
                sx={{ mb: 2 }}
              >
                Marque os itens que seu veículo possui:
              </Typography>

              <FormGroup row sx={{ gap: 2 }}>
                {vehicleItems.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    control={
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleItemToggle(item.id)}
                        name={item.id}
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: 28,
                          }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{
                        color: selectedItems.includes(item.id) ? 'primary.main' : 'text.primary',
                        fontWeight: selectedItems.includes(item.id) ? 500 : 400
                      }}>
                        {item.label}
                      </Typography>
                    }
                    sx={{
                      m: 0,
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      bgcolor: selectedItems.includes(item.id) ? 'rgba(24, 232, 219, 0.08)' : 'transparent',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      }
                    }}
                  />
                ))}
              </FormGroup>
            </Box>
          </Grid>

          <Grid size={12}>
            <Grid spacing={1}>
              <Grid size={12}>
                <Grid container alignItems="start" wrap="nowrap">
                  <Grid>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Fotos do Veículo
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.primary">
                  Adicione as {photoTypes.length} fotos obrigatórias do seu veículo. Todas as fotos são necessárias para prosseguir.
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {photoTypes.map(type => (
            <Grid key={type.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  border: "1px dashed",
                  borderColor: errors[`photo_${type.id}`] ? theme.palette.error.main : "divider",
                  borderRadius: 1,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center",
                  minHeight: 200,
                  position: "relative",
                  backgroundImage: !photos[type.id] ? `url(/images/${type.id}.png)` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.76)',
                    zIndex: 1, // Apenas o overlay fica atrás
                  },
                }}
              >
                {photos[type.id] ? (
                  <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                    <Box
                      component="img"
                      src={photos[type.id]}
                      alt={`Foto ${type.label}`}
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 1,
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        component="label"
                        sx={{
                          color: theme.palette.primary.main,
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        Alterar
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleFileUpload(type.id, e)}
                          ref={el => fileInputsRef.current[type.id] = el}
                        />
                      </Button>
                      {isMobile && (
                        <Button
                          size="small"
                          onClick={() => captureFromCamera(type.id)}
                          sx={{
                            color: theme.palette.primary.main,
                            position: 'relative',
                            zIndex: 2
                          }}
                          startIcon={<CameraAltIcon fontSize="small" />}
                        >
                          Tirar foto
                        </Button>
                      )}
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          setPhotos(prev => ({ ...prev, [type.id]: "" }));
                          setPhotoFiles(prev => {
                            const newFiles = { ...prev };
                            if (newFiles[type.id]?.previewUrl) {
                              URL.revokeObjectURL(newFiles[type.id].previewUrl);
                            }
                            delete newFiles[type.id];
                            return newFiles;
                          });
                          if (fileInputsRef.current[type.id]) {
                            fileInputsRef.current[type.id].value = "";
                          }
                        }}
                        sx={{ position: 'relative', zIndex: 2 }}
                      >
                        Remover
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                    {uploadProgress[type.id] ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <CircularProgress
                          variant="determinate"
                          value={uploadProgress[type.id]}
                          sx={{ mb: 2, color: theme.palette.colors.primary }}
                        />
                        <Typography variant="caption" color="text.primary">
                          Enviando... {uploadProgress[type.id]}%
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        <CloudUploadIcon
                          sx={{
                            fontSize: 40,
                            color: errors[`photo_${type.id}`] ? theme.palette.error.main : "primary.main",
                            mb: 1,
                          }}
                        />
                        <Typography variant="subtitle2" align="center" color="text.primary" gutterBottom>
                          {type.label}
                        </Typography>
                        <Typography variant="body2" color="text.primary" align="center" sx={{ mb: 2 }}>
                          {type.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, textAlign: "center" }}>
                          <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            component="label"
                            sx={{
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                              "&:hover": {
                                borderColor: "#15d5c9",
                                bgcolor: "rgba(24, 232, 219, 0.04)",
                              },
                            }}
                          >
                            Selecionar
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) => handleFileUpload(type.id, e)}
                            />
                          </Button>
                          {isMobile && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => captureFromCamera(type.id)}
                              sx={{
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                "&:hover": {
                                  borderColor: "#15d5c9",
                                  bgcolor: "rgba(24, 232, 219, 0.04)",
                                },
                              }}
                              startIcon={<CameraAltIcon fontSize="small" />}
                            >
                              Tirar foto
                            </Button>
                          )}
                        </Box>
                      </>
                    )}
                    {errors[`photo_${type.id}`] && (
                      <FormHelperText error sx={{ position: "absolute", bottom: 8, left: 16, zIndex: 2 }}>
                        {errors[`photo_${type.id}`]}
                      </FormHelperText>
                    )}
                  </Box>
                )}
              </Box>
            </Grid>
          ))}

        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, bgcolor: theme.palette.background.default }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading || Object.keys(uploadProgress).length > 0}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#15d5c9",
            },
            minWidth: 120,
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : isEditing ? "Atualizar" : "Adicionar"}
        </Button>

      </DialogActions>


    </Dialog >
  );
};

export default VehicleFormModal;