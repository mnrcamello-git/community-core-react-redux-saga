/**
 * formats the backend's response to data table format
 * @param {arr} users the /users/all-users
 */
export const formatUserData = users => {
  const data = users;
  const dataLength = users.length;
  const formatted = [];

  for (let i = 0; i < dataLength; i += 1) {
    const rolesLength = data[i].user_roles.length;
    let concatRoles = '';
    for (let j = 0; j < rolesLength; j += 1) {
      concatRoles += `${data[i].user_roles[j].role_name} `;
    }
    if (data[i].active === 0) {
      data[i].active = 'Inactive';
    } else if (data[i].active === 1) {
      data[i].active = 'Active';
    } else {
      data[i].active = 'Blocked';
    }

    formatted.push({
      id: i,
      user_id: data[i].user_id,
      client: data[i].client ? data[i].client.client_name : '-',
      email: data[i].email,
      firstname: data[i].first_name,
      lastname: data[i].last_name,
      position: data[i].position,
      role: concatRoles,
      mobile: data[i].mobile_nbr,
      landline: data[i].landline_nbr,
      active: data[i].active,
      last_login_ip: data[i].last_login_ip,
      last_login_date: data[i].last_login_date,
    });
  }
  return formatted;
};
