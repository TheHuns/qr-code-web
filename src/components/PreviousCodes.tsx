import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { QrCode } from "../types/QrCode"

const PreviousCodes = () => {
  const [previousCodes, setPreviousCodes] = useState<QrCode[]>([])
  const [errorMessage, setErrorMessage] = useState("")

  async function fetchCodes() {
    setErrorMessage("")
    const res = await fetch("http://localhost:5000/qr-codes")

    if (!res.ok) return setErrorMessage("Error encountered fetching previous codes")

    const result = await res.json()

    setPreviousCodes(result)
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      <Button variant="contained" sx={{ marginBottom: 4 }} color="secondary" onClick={fetchCodes}>
        {previousCodes.length > 0 ? "Refresh Codes" : "Get Past 3 Codes"}
      </Button>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {previousCodes.slice(-4, -1).map((code: QrCode) => (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 1 }}>
            <img src={code.dataUrl} height={200} width={200} alt="previous code" />
            <Typography variant="caption">
              {code.isValid ? "Still good" : "No longer valid"}
            </Typography>
          </Box>
        ))}
      </Box>
      {errorMessage && (
        <Typography variant="caption" color="rgb(250, 10, 10)">
          {errorMessage}
        </Typography>
      )}
    </Box>
  )
}

export default PreviousCodes
