const API_BASE_URL = 'http://localhost:3000';

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

        async getAll() {
            const response = await fetch(API_URL);
            return response.json();
        },

        async getPagination(page = 1, limit = 10) {
            const response = await fetch(`${API_URL}?_page=${page}&_limit=${limit}`);
            return response.json();
        },


        async update(id: string, data: any) {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.json();
        },

        async delete(id: string) {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            return response.json();
        }
    };
}

// Tạo các instance cho từng model
export const teamsAPI = createAPI('teams');
export const tasksAPI = createAPI('tasks');
export const usersAPI = createAPI('users');