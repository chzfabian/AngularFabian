interface NavItem {
    path: string;
    title: string;
    icon?: string;
  }
  
  const links: NavItem[] = [
    {
      path: 'estudiantes',
      title: 'Estudiantes',
      icon: 'person',
    },
    {
      path: 'cursos',
      title: 'Cursos',
      icon: 'school'
    },
    {
      path: 'inscripciones',
      title: 'Inscripciones',
      icon: 'history_edu'
    },
    {
      path: 'usuarios',
      title: 'Usuarios',
      icon: 'admin_panel_settings'
    },
  ]
  
  export default links;  