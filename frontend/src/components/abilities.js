// import { AbilityBuilder, Ability } from '@casl/ability';

// export default function defineAbilitiesFor(role) {
//   const { can, cannot, build } = new AbilityBuilder(Ability);
// console.log('Rol',role)
//   if (role === 4) {
//     can('manage', 'all');
//   } 
//   if (role === 5) {
//     can('read', 'all')}
//   else {
//     can('read', 'all');
//     cannot('delete', 'all');
//   }

//   return build();
// }
// abilities.js
// abilities.js

import { AbilityBuilder, PureAbility } from '@casl/ability';

export default function defineAbilitiesFor(role) {
  const { can, cannot, build } = new AbilityBuilder(PureAbility);

  console.log('Rol', role);

  switch (role) {
    case 4:
      can('manage', 'all'); // Permiso para gestionar todos los recursos
      break;
    case 5:
      can('read', 'all'); // Permiso solo para leer todos los recursos
      can('create', 'all');
      break;
    default:
      can('read', 'all'); // Permiso predeterminado de lectura
      cannot('delete', 'all'); // No puede eliminar ningún recurso
      break;
  }

  const ability = build();

  console.log('Habilidades definidas:', ability.rules); // Verifica las reglas definidas

  return ability;
}

