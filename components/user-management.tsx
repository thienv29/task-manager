"use client"

// Import các hook và component cần thiết
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import UserList from "@/components/user-list"
import UserModal from "@/components/user-modal"
import { useUserStore } from "@/lib/stores/storeUsers"
import { useTeamStore } from "@/lib/stores/storeTeams"
import type { User } from "@/lib/types"

// Định nghĩa component UserManagement
export default function UserManagement() {
  // Sử dụng hook useStore từ Zustand để truy cập và cập nhật trạng thái
  const {
    users, // Danh sách người dùng
    isModalOpen, // Trạng thái mở/đóng của modal
    editingUser, // Người dùng đang được chỉnh sửa
    setIsModalOpen, // Hàm để cập nhật trạng thái mở/đóng của modal
    setEditingUser, // Hàm để cập nhật người dùng đang được chỉnh sửa
    addUser, // Hàm để thêm người dùng mới
    editUser, // Hàm để chỉnh sửa người dùng
    deleteUser, // Hàm để xóa người dùng
    fetchUsers, // Hàm để lấy danh sách người dùng từ API
  } = useUserStore();
  const { teams, fetchTeams } = useTeamStore(); // Lấy danh sách đội và hàm fetchTeams từ store

  // Sử dụng useEffect để gọi hàm fetchUsers và fetchTeams khi component được mount
  useEffect(() => {
    fetchUsers();
    fetchTeams();
  }, [fetchUsers, fetchTeams]);

  // Hàm để mở modal chỉnh sửa người dùng
  const openEditModal = (user: User) => {
    setEditingUser(user); // Cập nhật người dùng đang được chỉnh sửa
    setIsModalOpen(true); // Mở modal
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Hiển thị danh sách người dùng */}
      <UserList users={users} teams={teams} onEditUser={openEditModal} />

      {/* Modal để thêm hoặc chỉnh sửa người dùng */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false); // Đóng modal
          setEditingUser(null); // Xóa người dùng đang được chỉnh sửa
        }}
        onSave={editingUser ? editUser : addUser} // Lưu người dùng mới hoặc chỉnh sửa người dùng
        onDelete={editingUser ? deleteUser : undefined} // Xóa người dùng nếu đang chỉnh sửa
        teams={teams} // Truyền danh sách đội vào modal
        user={editingUser} // Truyền người dùng đang được chỉnh sửa vào modal
      />
    </div>
  );
}

