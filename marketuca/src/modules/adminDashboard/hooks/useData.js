"use client"

import { useState, useEffect, useContext } from "react"
import {
  getUsers,
  getCategories,
  getFaculties,
  createCategory,
  patchCategory,
  createFaculty,
  patchFaculty,
} from "../services/apiService"
import { AuthContext } from "../../../context/AuthContext"

export function useData() {
  const { token } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [faculties, setFaculties] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      if (!token) {
        if (isMounted) {
          setError("No se encontró un token de autenticación")
          setIsLoading(false)
          window.location.href = "/login"
        }
        return
      }

      if (isMounted) setIsLoading(true)

      try {
        const [uRes, cRes, fRes] = await Promise.all([
          getUsers(token),
          getCategories(token),
          getFaculties(token),
        ])

        const usersData = uRes.data
        const categoriesData = cRes.data
        const facultiesData = fRes.data.map(f => ({
          faculty: f.facultyName || "Sin nombre",
          ...f,
        }))

        if (isMounted) {
          setUsers(Array.isArray(usersData) ? usersData : [])
          setCategories(Array.isArray(categoriesData) ? categoriesData : [])
          setFaculties(Array.isArray(facultiesData) ? facultiesData : [])
          setError(
            !usersData?.length && !categoriesData?.length && !facultiesData?.length
              ? "No se encontraron datos en el servidor"
              : null
          )
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || "Error al cargar los datos")
          if (err.response?.status === 401) window.location.href = "/login"
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadData()
    return () => { isMounted = false }
  }, [token])

  const addUser = user =>
    setUsers(prev => [...prev, user])

  const updateUser = (index, user) =>
    setUsers(prev => prev.map((u, i) => (i === index ? user : u)))

  const deleteUser = index =>
    setUsers(prev => prev.filter((_, i) => i !== index))

  const addCategory = async category => {
    try {
      const resp = await createCategory(token, category)
      setCategories(prev => [...prev, resp.data])
    } catch (err) {
      alert(err.response?.data?.message || "No se pudo crear la categoría.")
    }
  }

  const updateCategory = async (index, category) => {
    try {
      const { name: originalName } = categories[index]
      const { name: newName, description } = category

      await patchCategory(token, originalName, newName, description)

      setCategories(prev =>
        prev.map((c, i) =>
          i === index ? { ...c, name: newName, description } : c,
        )
      )
    } catch (err) {
      alert(err.response?.data?.message || "No se pudo actualizar la categoría.")
    }
  }

  const deleteCategory = index =>
    setCategories(prev => prev.filter((_, i) => i !== index))

  const addFaculty = async obj => {
    try {
      await createFaculty(token, obj.facultyName)

      setFaculties(prev => [
        ...prev,
        { faculty: obj.facultyName },
      ])
    } catch (err) {
      alert(err.response?.data?.message || "No se pudo crear la facultad.")
    }
  }

  const updateFaculty = async (index, obj) => {
    try {
      const originalName = faculties[index].faculty
      const newFacultyName = obj.facultyName

      await patchFaculty(token, originalName, newFacultyName)

      setFaculties(prev =>
        prev.map((f, i) =>
          i === index ? { ...f, faculty: newFacultyName } : f,
        )
      )
    } catch (err) {
      alert(err.response?.data?.message || "No se pudo actualizar la facultad.")
    }
  }

  const deleteFaculty = index =>
    setFaculties(prev => prev.filter((_, i) => i !== index))

  return {
    users,
    categories,
    faculties,

    isLoading,
    error,

    addUser,
    updateUser,
    deleteUser,

    addCategory,
    updateCategory,
    deleteCategory,

    addFaculty,
    updateFaculty,
    deleteFaculty,
  }
}
