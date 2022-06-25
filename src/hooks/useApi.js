import React from "react"
import axios from "axios"

import { API_ENDPOINT } from "../environments"

const BASE_API = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
    'Content-Security-Policy': 'upgrade-insecure-requests'
  }
})


export const useApi = () => {
  const getIdentity = async ({ address }) => {
    try {
      const identity = await BASE_API.get(`/identity?address=${address}`)
      return identity.data
    } catch (err) {
      return err.response.data
    }
  }

  const createIdentity = async ({ address, email, fullName, txHash, identityAddress }) => {

  }

  return {
    getIdentity,
    createIdentity
  }
}