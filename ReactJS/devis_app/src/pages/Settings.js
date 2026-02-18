import { useState } from "react"
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Tabs,
  Tab,
} from "@mui/material"
import { Delete } from "@mui/icons-material"

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState({
    nom: "",
    formeJuridique: "",
    siret: "",
    rcs: "",
    tva: "",
    ape: "",
    adresse: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",
  })

  const categories = ["Société", "Client", "Fournisseur", "Comptabilité"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setCompany({ ...company, [name]: value })
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCompanies([...companies, { ...company, id: Date.now() }])
    setCompany({
      nom: "",
      formeJuridique: "",
      siret: "",
      rcs: "",
      tva: "",
      ape: "",
      adresse: "",
      codePostal: "",
      ville: "",
      telephone: "",
      email: "",
    })
  }

  const handleDelete = (id) => {
    setCompanies(companies.filter((c) => c.id !== id))
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Onglets horizontaux */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {categories.map((cat, index) => (
          <Tab label={cat} key={index} />
        ))}
      </Tabs>

      {/* Contenu selon l'onglet sélectionné */}
      {selectedTab === 0 && (
        <>
          {/* Formulaire société */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Gestion des sociétés
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nom de la société"
                    name="nom"
                    value={company.nom}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Forme juridique"
                    name="formeJuridique"
                    value={company.formeJuridique}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="N° SIRET"
                    name="siret"
                    value={company.siret}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="N° RCS"
                    name="rcs"
                    value={company.rcs}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="N° TVA intracom."
                    name="tva"
                    value={company.tva}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Code APE / NAF"
                    name="ape"
                    value={company.ape}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Adresse"
                    name="adresse"
                    value={company.adresse}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Code Postal"
                    name="codePostal"
                    value={company.codePostal}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Ville"
                    name="ville"
                    value={company.ville}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Téléphone"
                    name="telephone"
                    value={company.telephone}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={company.email}
                    onChange={handleChange}
                    required
                    type="email"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" type="submit">
                  Ajouter
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Liste des sociétés */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
              Liste des sociétés
            </Typography>

            {companies.length === 0 ? (
              <Typography>Aucune société enregistrée.</Typography>
            ) : (
              <List>
                {companies.map((c) => (
                  <Box key={c.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(c.id)}
                        >
                          <Delete color="error" />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={`${c.nom} (${c.ville})`}
                        secondary={`SIRET: ${c.siret} | RCS: ${c.rcs} | TVA: ${c.tva} | APE: ${c.ape}`}
                      />
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            )}
          </Paper>
        </>
      )}

      {selectedTab === 1 && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5">Gestion des clients</Typography>
          <Typography>🚧 À implémenter</Typography>
        </Paper>
      )}

      {selectedTab === 2 && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5">Gestion des fournisseurs</Typography>
          <Typography>🚧 À implémenter</Typography>
        </Paper>
      )}

      {selectedTab === 3 && (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5">Comptabilité</Typography>
          <Typography>🚧 À implémenter</Typography>
        </Paper>
      )}
    </Container>
  )
}

export default Settings
