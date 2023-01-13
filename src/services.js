import axios from "axios";
import { API_KEY } from "./constants"

export function getAllCountries () {
  return axios.get(API_KEY)
}

export function getSingleCountry (countryId) {
  return axios.get(`${API_KEY}${countryId}`)
}

export function createCountry (country) {
  return axios.post(API_KEY, country)
}

export function updateCountry (countryId, country) {
  return axios.patch(`${API_KEY}${countryId}`, country)
}

export function deleteCountry (countryId) {
  return axios.delete(`${API_KEY}${countryId}`)
}