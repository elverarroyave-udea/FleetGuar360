/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useRouter } from "next/router"

export function useLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const path = "http://localhost:8080/api/login"
      const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        throw new Error("Credenciales incorrectas")
      }
      const data = await response.json()
      // Aquí puedes guardar el token, redirigir, etc.
      router.push("/gestionFlota")
      console.log("Login exitoso:", data)
    } catch (err: any) {
      setError(err.message)
      console.error("Error en login:", err)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    error,
  }
}