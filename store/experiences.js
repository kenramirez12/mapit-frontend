export const actions = {
  async getExperiences ({}, params) {
    console.log('params', params)
    try {
      const resp = await this.$axios.$get('/experiences', { params })
      return resp.data
    } catch (error) {
      console.error(error)
      return null
    }
  }
}