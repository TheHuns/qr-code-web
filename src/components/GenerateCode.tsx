import React, { useState } from "react"
import { Card, Typography, Button, Box } from "@mui/material"
import { User } from "../types/User"
import { toDataURL } from "qrcode"
import { QrCode } from "../types/QrCode"
import Countdown from "react-countdown"

const FIVE_MINUTES_MILLISECONDS = 300000
interface Props {
  user: User
}

const GenerateCode = ({ user }: Props) => {
  const [currentCode, setCurrentCode] = useState<QrCode | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  async function postCreateCode(newCode: QrCode) {
    const res = await fetch("http://localhost:5000/qr-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCode),
    })
    if (!res.ok) return setErrorMessage("Error encoutered posting to backend")
  }

  async function createCode() {
    setErrorMessage("")
    const timeStamp = Date.now()
    const newDataUrl = await toDataURL(timeStamp.toString())

    const newCode: QrCode = {
      dataUrl: newDataUrl,
      createdAt: timeStamp,
      isValid: true,
      userId: user.id,
    }

    setCurrentCode(newCode)
    postCreateCode(newCode)
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Create QR code
      </Typography>
      <Typography variant="h6" gutterBottom>
        User: {user.name}
      </Typography>
      <Button variant="contained" onClick={createCode}>
        {currentCode ? "New Code" : "Create"}
      </Button>

      {currentCode && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 1,
            marginBottom: 2,
          }}
        >
          <img src={currentCode.dataUrl} alt="current QR code" height={200} width={200} />
          <Typography variant="subtitle1" gutterBottom>
            Code valid for:
          </Typography>
          <Countdown date={currentCode.createdAt + FIVE_MINUTES_MILLISECONDS} />
        </Box>
      )}
      {errorMessage && (
        <Typography variant="caption" color="rgb(250, 10, 10)">
          {errorMessage}
        </Typography>
      )}
    </Card>
  )
}

export default GenerateCode
