import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 1, text: "Accuweather", value: 1, katz: false},
  { key: 2, text: "Antenna", value: 2, katz: false },
  { key: 3, text: "BounceTV", value: 3, katz: true },
  { key: 4, text: "CBS Sports", value: 4, katz: false },
  { key: 5, text: "CourtTV", value: 5, katz: false },
  { key: 6, text: "CourtTV Mystery", value: 6, katz: true },
  { key: 7, text: "GritTV", value: 7, katz: true },
  { key: 8, text: "Justice Network", value: 8, katz: false },
  { key: 9, text: "Laff", value: 9, katz: true },
  { key: 10, text: "MLB", value: 10, katz: false },
  { key: 11, text: "Newsy", value: 11, katz: false},
  { key: 12, text: "NHL", value: 12, katz: false},
  { key: 13, text: "Quest Network", value: 13, katz: false},
  { key: 14, text: "Stadium", value: 14, katz: false},
  { key: 15, text: "ThisTV", value: 15, katz: false}
]

const NetworkDropdown = (props) => (
   <Dropdown clearable options={options} placeholder={"Select Network"} onChange={props.setNetwork}/>
)

export default NetworkDropdown
