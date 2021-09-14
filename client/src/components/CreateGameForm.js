import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const CreateGameForm = ({ cookies, onFormSubmit }) => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    players: [
      "",
      "",
      "",
      ""
    ],
    title: "",
    rank: ""
  })

  const handleFormChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setFormData({ ...formData, [key]: value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (formData.title.length > 0 && parseInt(formData.rank) > 0 && cookies.name) {
      onFormSubmit({ ...formData, rank: parseInt(formData.rank) })
      setFormData({
        players: [
          "",
          "",
          "",
          ""
        ],
        title: "",
        rank: ""
      })
    } else if (!cookies.name) {
      alert("Please log in to create a lobby")
      history.push("/")
    } else {
      alert("Please enter a lobby name, rank must be greater than 0")
    }
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit} >
        <h3>Create a New Lobby!</h3>
        <input
          className="input"
          name="title"
          onChange={handleFormChange}
          placeholder="Enter lobby name ..."
          type="text"
          value={formData.title}
        />
        <input
          className="input"
          name="rank"
          onChange={handleFormChange}
          placeholder="Minimum rank"
          type="number"
          value={formData.rank}
        />
        <input
          className="button"
          name="submit"
          type="submit"
          value="Create New Lobby"
        />
      </form>
    </div>
  )
}

export default CreateGameForm
