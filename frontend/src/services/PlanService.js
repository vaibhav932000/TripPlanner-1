const url = "http://localhost:8000"

export const findAllPlans = () =>
    fetch(`${url}/allplans`)
        .then(response => response.json())

export const findPlanById = (planId) =>
    fetch(`${url}/plans/${planId}`)
        .then(response => response.json())

export const findPlansForUser = (userId) =>
    fetch(`${url}/user/${userId}/plans`).then(response => response.json())


export const createPlanForUser = (userId, plan) =>
    fetch(`${url}/plans`, {
        method: "POST",
        body: JSON.stringify(plan),
        headers: {
            "content-type": "application/json"
        }
    })

export const updatePlan = (planId, plan) =>
    fetch(`${url}/plans/${planId}`, {
        method: "PUT",
        body: JSON.stringify(plan),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => response.json())

export const deletePlan = (planId) =>
    fetch(`${url}/plans/${planId}`, {
        method: "DELETE"
    }).then(response => response.json())

export default {
    findAllPlans,
    findPlanById,
    findPlansForUser,
    createPlanForUser,
    updatePlan,
    deletePlan
}
