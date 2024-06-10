-- ROLES ASSOCIADAS A UM USUÁRIO POR EMAIL
select
	u.id,
	u.uuid,
	u.email,
	ur.id usuarioRoleId,
	r.nome
from
	usuarios_roles ur
join roles r on
	r.id = ur.role_id
join usuarios u on
	u.id = ur.usuarioId 
where
	u.email = 'funcionario@gmail.com';
