import api from "./api";

/**
 * CHV submits a new case
 * POST /api/chv/cases
 */
export const submitCase = async (payload) => {
  const res = await api.post("/chv/cases", payload);
  return res.data;
};

/**
 * CHV views own submitted cases
 * GET /api/chv/cases/me
 */
export const fetchMyCases = async () => {
  const res = await api.get("/chv/cases/me");
  return res.data;
};

/**
 * CHV verification status
 * GET /api/chv/verification
 */
export const fetchVerificationStatus = async () => {
  const res = await api.get("/chv/verification");
  return res.data;
};

/**
 * NGO / Admin: CHV activity tracking
 * GET /api/chv/activity
 */
export const fetchCHVActivity = async () => {
  const res = await api.get("/chv/activity");
  return res.data;
};
