import { useState, useEffect } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import logo from "../logo_edc_plomb.png"
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material"
import { Delete } from "@mui/icons-material"

const generateRandomDevisNumber = () => {
  return "DEV-" + Math.floor(1000 + Math.random() * 9000)
}

const DevisPage = () => {
  const [client, setClient] = useState({
    nom: "",
    adresse: "",
    contact: "",
    email: "",
  })

  const [devisInfo, setDevisInfo] = useState({
    numero: generateRandomDevisNumber(),
    date: "",
    validite: "",
  })

  const [prestations, setPrestations] = useState([])

  const [currentLine, setCurrentLine] = useState({
    description: "",
    quantite: 1,
    prixUnitaire: 0,
    tva: 20, // par défaut 20%
  })

  const handleClientChange = (e) => {
    const { name, value } = e.target
    setClient({ ...client, [name]: value })
  }

  const handleDevisInfoChange = (e) => {
    const { name, value } = e.target
    setDevisInfo({ ...devisInfo, [name]: value })
  }

  const handleLineChange = (e) => {
    const { name, value } = e.target
    setCurrentLine({ ...currentLine, [name]: value })
  }

  const addLine = () => {
    setPrestations([
      ...prestations,
      {
        ...currentLine,
        id: Date.now(),
        quantite: Number(currentLine.quantite),
        prixUnitaire: Number(currentLine.prixUnitaire),
        tva: Number(currentLine.tva),
      },
    ])
    setCurrentLine({ description: "", quantite: 1, prixUnitaire: 0, tva: 20 })
  }

  const removeLine = (id) => {
    setPrestations(prestations.filter((line) => line.id !== id))
  }

  // Calculs
  const totalHT = prestations.reduce(
    (acc, line) => acc + line.quantite * line.prixUnitaire,
    0
  )

  const totalTVA = prestations.reduce(
    (acc, line) => acc + (line.quantite * line.prixUnitaire * line.tva) / 100,
    0
  )

  const totalTTC = totalHT + totalTVA

  const [devisList, setDevisList] = useState([])

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Couleurs
    const PRIMARY_COLOR = [33, 150, 243]
    const DARK_COLOR = [33, 33, 33]

    /* ================= HEADER ================= */
    doc.setFillColor(...PRIMARY_COLOR)
    doc.rect(0, 0, pageWidth, 28, "F")

    // Logo
    doc.addImage(logo, "PNG", 14, 6, 16, 30)

    // Titre
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.text("DEVIS", pageWidth - 50, 18)

    /* ================= INFOS ================= */
    doc.setTextColor(...DARK_COLOR)
    doc.setFontSize(11)

    // Infos devis (droite)
    doc.text(`N° : ${devisInfo.numero}`, pageWidth - 70, 40)
    doc.text(`Date : ${devisInfo.date}`, pageWidth - 70, 46)
    doc.text(`Validité : ${devisInfo.validite}`, pageWidth - 70, 52)

    // Infos client (gauche)
    doc.text("CLIENT", 14, 40)
    doc.setFontSize(10)
    doc.text(client.nom, 14, 46)
    doc.text(client.adresse, 14, 52)
    doc.text(client.contact, 14, 58)
    doc.text(client.email, 14, 64)

    /* ================= TABLE ================= */
    autoTable(doc, {
      startY: 75,
      head: [["Description", "Qté", "PU HT (€)", "TVA %", "Total TTC (€)"]],
      body: prestations.map((l) => {
        const totalTTC = l.quantite * l.prixUnitaire * (1 + l.tva / 100)
        return [
          l.description,
          l.quantite,
          l.prixUnitaire.toFixed(2),
          l.tva,
          totalTTC.toFixed(2),
        ]
      }),
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: PRIMARY_COLOR,
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 14, right: 14 },
    })

    const finalY = doc.lastAutoTable.finalY + 10

    /* ================= TOTALS ================= */
    doc.setFontSize(11)
    doc.text(`Total HT : ${totalHT.toFixed(2)} €`, pageWidth - 70, finalY)
    doc.text(`Total TVA : ${totalTVA.toFixed(2)} €`, pageWidth - 70, finalY + 6)

    doc.setFontSize(13)
    doc.setTextColor(...PRIMARY_COLOR)
    doc.text(
      `TOTAL TTC : ${totalTTC.toFixed(2)} €`,
      pageWidth - 70,
      finalY + 14
    )

    /* ================= FOOTER ================= */
    const pageCount = doc.internal.getNumberOfPages()

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(9)
      doc.setTextColor(120)

      doc.text(
        "Devis valable 30 jours – TVA non applicable, art. 293B du CGI (si applicable)",
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      )

      doc.text(
        `Page ${i} / ${pageCount}`,
        pageWidth - 20,
        doc.internal.pageSize.height - 10,
        { align: "right" }
      )
    }

    /* ================= SAVE ================= */
    doc.save(`Devis_${devisInfo.numero}.pdf`)
  }

  // Générer un numéro de devis au chargement de la page
  useEffect(() => {
    setDevisInfo((prev) => ({ ...prev, numero: generateRandomDevisNumber() }))
    const storedDevis = localStorage.getItem("devisList")
    if (storedDevis) {
      setDevisList(JSON.parse(storedDevis))
    }
  }, [])

  const saveDevis = () => {
    const newDevis = {
      id: Date.now(),
      numero: devisInfo.numero,
      date: devisInfo.date,
      validite: devisInfo.validite,
      client,
      prestations,
      totalHT,
      totalTVA,
      totalTTC,
    }

    const updatedList = [...devisList, newDevis]

    setDevisList(updatedList)
    localStorage.setItem("devisList", JSON.stringify(updatedList))
  }

  const deleteDevis = (id) => {
    const updatedList = devisList.filter((d) => d.id !== id)
    setDevisList(updatedList)
    localStorage.setItem("devisList", JSON.stringify(updatedList))
  }

  const generatePDFFromDevis = (devis) => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Couleurs
    const PRIMARY_COLOR = [33, 150, 243]
    const DARK_COLOR = [33, 33, 33]

    /* ================= HEADER ================= */
    doc.setFillColor(...PRIMARY_COLOR)
    doc.rect(0, 0, pageWidth, 28, "F")

    // Logo
    doc.addImage(logo, "PNG", 14, 6, 16, 30)

    // Titre
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.text("DEVIS", pageWidth - 50, 18)

    /* ================= INFOS ================= */
    doc.setTextColor(...DARK_COLOR)
    doc.setFontSize(11)

    // Infos devis (droite)
    doc.text(`N° : ${devisInfo.numero}`, pageWidth - 70, 40)
    doc.text(`Date : ${devisInfo.date}`, pageWidth - 70, 46)
    doc.text(`Validité : ${devisInfo.validite}`, pageWidth - 70, 52)

    // Infos client (gauche)
    doc.text("CLIENT", 14, 40)
    doc.setFontSize(10)
    doc.text(client.nom, 14, 46)
    doc.text(client.adresse, 14, 52)
    doc.text(client.contact, 14, 58)
    doc.text(client.email, 14, 64)

    /* ================= TABLE ================= */
    autoTable(doc, {
      startY: 75,
      head: [["Description", "Qté", "PU HT (€)", "TVA %", "Total TTC (€)"]],
      body: prestations.map((l) => {
        const totalTTC = l.quantite * l.prixUnitaire * (1 + l.tva / 100)
        return [
          l.description,
          l.quantite,
          l.prixUnitaire.toFixed(2),
          l.tva,
          totalTTC.toFixed(2),
        ]
      }),
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: PRIMARY_COLOR,
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { left: 14, right: 14 },
    })

    const finalY = doc.lastAutoTable.finalY + 10

    /* ================= TOTALS ================= */
    doc.setFontSize(11)
    doc.text(`Total HT : ${totalHT.toFixed(2)} €`, pageWidth - 70, finalY)
    doc.text(`Total TVA : ${totalTVA.toFixed(2)} €`, pageWidth - 70, finalY + 6)

    doc.setFontSize(13)
    doc.setTextColor(...PRIMARY_COLOR)
    doc.text(
      `TOTAL TTC : ${totalTTC.toFixed(2)} €`,
      pageWidth - 70,
      finalY + 14
    )

    /* ================= FOOTER ================= */
    const pageCount = doc.internal.getNumberOfPages()

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(9)
      doc.setTextColor(120)

      doc.text(
        "Devis valable 30 jours – TVA non applicable, art. 293B du CGI (si applicable)",
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      )

      doc.text(
        `Page ${i} / ${pageCount}`,
        pageWidth - 20,
        doc.internal.pageSize.height - 10,
        { align: "right" }
      )
    }

    /* ================= SAVE ================= */
    doc.save(`Devis_${devisInfo.numero}.pdf`)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Création de devis
      </Typography>

      {/* Informations du client */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Informations du client
        </Typography>
        <Grid container spacing={2}>
          <Grid>
            <TextField
              label="Nom / Société"
              name="nom"
              value={client.nom}
              onChange={handleClientChange}
              fullWidth
            />
          </Grid>
          <Grid>
            <TextField
              label="Adresse"
              name="adresse"
              value={client.adresse}
              onChange={handleClientChange}
              fullWidth
            />
          </Grid>
          <Grid>
            <TextField
              label="Contact"
              name="contact"
              value={client.contact}
              onChange={handleClientChange}
              fullWidth
            />
          </Grid>
          <Grid>
            <TextField
              label="Email"
              name="email"
              value={client.email}
              onChange={handleClientChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Informations du devis */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Informations du devis
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={devisInfo.date}
              onChange={handleDevisInfoChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Validité"
              name="validite"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={devisInfo.validite}
              onChange={handleDevisInfoChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Numéro du devis : {devisInfo.numero}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Tableau des prestations */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Prestations
        </Typography>

        {/* Ligne à ajouter */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <TextField
              label="Description"
              name="description"
              value={currentLine.description}
              onChange={handleLineChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              label="Qté"
              name="quantite"
              type="number"
              value={currentLine.quantite}
              onChange={handleLineChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Prix Unitaire HT"
              name="prixUnitaire"
              type="number"
              value={currentLine.prixUnitaire}
              onChange={handleLineChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              label="TVA %"
              name="tva"
              type="number"
              value={currentLine.tva}
              onChange={handleLineChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={addLine}>
              Ajouter
            </Button>
          </Grid>
        </Grid>

        {/* Tableau */}
        <Table sx={{ mt: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Qté</TableCell>
              <TableCell>PU HT</TableCell>
              <TableCell>TVA %</TableCell>
              <TableCell>Montant TTC</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prestations.map((line) => {
              const quantite = Number(line.quantite)
              const prixUnitaire = Number(line.prixUnitaire)
              const tva = Number(line.tva)
              const montantTTC = quantite * prixUnitaire * (1 + tva / 100)

              return (
                <TableRow key={line.id}>
                  <TableCell>{line.description}</TableCell>
                  <TableCell>{quantite}</TableCell>
                  <TableCell>{prixUnitaire.toFixed(2)} €</TableCell>
                  <TableCell>{tva}%</TableCell>
                  <TableCell>{montantTTC.toFixed(2)} €</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => removeLine(line.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {/* Totaux */}
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={3}
          flexDirection="column"
        >
          <Typography>Total HT : {totalHT.toFixed(2)} €</Typography>
          <Typography>Total TVA : {totalTVA.toFixed(2)} €</Typography>
          <Typography variant="h6">
            Total TTC : {totalTTC.toFixed(2)} €
          </Typography>
        </Box>
      </Paper>

      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            saveDevis()
            generatePDF()
          }}
          disabled={prestations.length === 0}
        >
          Générer le devis
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Liste des devis
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Numéro</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total TTC</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {devisList.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.numero}</TableCell>
                <TableCell>{d.client.nom}</TableCell>
                <TableCell>{d.date}</TableCell>
                <TableCell>{d.totalTTC.toFixed(2)} €</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => generatePDFFromDevis(d)}>
                    PDF
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => deleteDevis(d.id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}

export default DevisPage
