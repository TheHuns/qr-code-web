import React, { useState, useEffect } from "react"
import { Box, LinearProgress } from "@mui/material"
import { User } from "./types/User"
import CreateUserForm from "./components/CreateUserForm"
import GenerateCode from "./components/GenerateCode"

function App() {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [checkingForUser, setCheckingForUser] = useState(true)

  useEffect(() => {
    const prevUserId = sessionStorage.getItem("userId")
    if (!prevUserId) return setCheckingForUser(false)

    const fetchUser = async () => {
      const res = await fetch(`http://localhost:5000/users/${prevUserId}`)
      const result = await res.json()
      setUser(result)
      setCheckingForUser(false)
    }

    fetchUser()
  }, [])

  if (checkingForUser) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    )
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto", marginTop: "50px" }}>
      {user ? <GenerateCode user={user} /> : <CreateUserForm setUser={setUser} />}
    </div>
  )
}

export default App
