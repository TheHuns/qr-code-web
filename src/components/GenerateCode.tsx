import React from "react"
import { Card, Typography, Button } from "@mui/material"
import { User } from "../types/User"

interface Props {
  user: User
}

const GenerateCode = ({ user }: Props) => {
  return (
    <Card sx={{ padding: 4 }}>
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 4 }}>
        Create QR code
      </Typography>
      <Typography variant="h6">User: {user.name}</Typography>
      <Button variant="contained" onClick={() => {}}>
        Create
      </Button>
    </Card>
  )
}

export default GenerateCode
