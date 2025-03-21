const API_BASE_URL = '/api';

function createAPI(resource: string) {
    const API_URL = `${API_BASE_URL}/${resource}`;

    return {
        async create(data: any) {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.json();
        },

        async getAll(params: Record<string, any> = {}) {
            try {
                const queryString = new URLSearchParams(params).toString();
                const response = await fetch(`${API_URL}?${queryString}`);

                if (!response.ok) throw new Error("Failed to fetch resources");
                return await response.json();
            } catch (error) {
                console.error("Fetch error:", error);
                throw error;
            }
        },


        async update(data: any) {
            const response = await fetch(`${API_URL}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.json();
        },

        async delete(id: number) {
            const response = await fetch(`${API_URL}`, {
                method: 'DELETE',
                body: JSON.stringify({id})
            });
            return response.json();
        }
    };
}

// Tạo các instance cho từng model
export const teamsAPI = createAPI('teams');
export const tasksAPI = createAPI('tasks');
export const usersAPI = createAPI('users');
export const columnsAPI = createAPI('columns');