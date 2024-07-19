// cadangan edit button
const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    // Panggil API untuk memperbarui data pengguna
    const updatedUser = await updateUser(token, formData);

    // Memperbarui baris yang ada dengan data yang baru diperbarui
    const updatedRows = rows.map((row) =>
      row.user_id === user_id
        ? {
            ...row,
            ...updatedUser,
            company: {
              name: updatedUser.company.name,
              company_id: updatedUser.company.company_id,
            },
            department: {
              name: updatedUser.department.name,
              department_id: updatedUser.department.department_id,
            },
            employment_status: {
              name: updatedUser.employment_status.name,
              employment_status_id:
                updatedUser.employment_status.employment_status_id,
            },
            job_position: {
              name: updatedUser.job_position.name,
              job_position_id: updatedUser.job_position.job_position_id,
            },
            role: {
              name: updatedUser.role.name,
              role_id: updatedUser.role.role_id,
            },
          }
        : row
    );

    // Menyimpan data yang diperbarui ke localStorage
    localStorage.setItem(CACHE_KEY, JSON.stringify(updatedRows));
    setRows(updatedRows);

    // Menutup modal setelah berhasil memperbarui data
    onCloseModal();
  } catch (error) {
    console.error("Error updating user:", error);
  }
};


<Modal dismissible show={openModal} size="2xl" onClose={onCloseModal}>
        <Modal.Header style={{ fontSize: "12px" }}>Edit Pengguna</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="full_name"
                className="block text-[12px] font-medium text-gray-700"
              >
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                id="full_name"
                name="full_name"
                placeholder="Masukkan nama lengkap"
                type="text"
                value={formData.full_name}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone_number"
                className="block text-[12px] font-medium text-gray-700"
              >
                No. Telepon <span className="text-red-500">*</span>
              </label>
              <input
                id="phone_number"
                name="phone_number"
                placeholder="ex. 081234567899"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[12px] font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* Company Name */}
            <div>
              <label
                htmlFor="company_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Nama Perusahaan <span className="text-red-500">*</span>
              </label>
              <select
                id="company_id"
                name="company_id"
                value={formData.company_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Pilih Perusahaan</option>
                {companies.map((company) => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label
                htmlFor="department_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Departemen <span className="text-red-500">*</span>
              </label>
              <select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Pilih Departemen</option>
                {departments.map((department) => (
                  <option key={department.department_id} value={department.department_id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Position */}
            <div>
              <label
                htmlFor="job_position_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Posisi <span className="text-red-500">*</span>
              </label>
              <select
                id="job_position_id"
                name="job_position_id"
                value={formData.job_position_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Pilih Posisi</option>
                {jobPositions.map((position) => (
                  <option key={position.job_position_id} value={position.job_position_id}>
                    {position.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employment Status */}
            <div>
              <label
                htmlFor="employment_status_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Status Pekerjaan <span className="text-red-500">*</span>
              </label>
              <select
                id="employment_status_id"
                name="employment_status_id"
                value={formData.employment_status_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Pilih Status Pekerjaan</option>
                {employmentStatuses.map((status) => (
                  <option key={status.employment_status_id} value={status.employment_status_id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Birth Date */}
            <div>
              <label
                htmlFor="birth_date"
                className="block text-[12px] font-medium text-gray-700"
              >
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <input
                id="birth_date"
                name="birth_date"
                type="date"
                placeholder="2003/09/27"
                value={formData.birth_date}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role_id"
                className="block text-[12px] font-medium text-gray-700"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                style={{ fontSize: "12px" }}
                required
                className="mt-1 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Pilih Role</option>
                <option value="1">Admin</option>
                <option value="2">Monitoring</option>
                <option value="3">User</option>
              </select>
            </div>

            <div className="col-span-2 flex gap-2 justify-end">
              <Button
                color="purple"
                className="h-[2.5rem] bg-purple-700 text-white border-[1px]"
                type="submit"
              >
                <p className="text-[12px]">Simpan Perubahan</p>
              </Button>
              <Button
                color="failure"
                className="h-[2.5rem] text-white border-[1px]"
                onClick={onCloseModal}
              >
                <p className="text-[12px]">Batal</p>
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
