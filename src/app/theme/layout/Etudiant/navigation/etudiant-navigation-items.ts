import { NavigationItem } from "./navigation";

export const EtudiantNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'dashboard',
    url: '/etudiant/dashboard'
  },
  {
    id: 'courses',
    title: 'Mes cours',
    type: 'item',
    icon: 'school',
    url: '/etudiant/courses'
  },
  {
    id: 'assignments',
    title: 'Devoirs',
    type: 'item',
    icon: 'assignment',
    url: '/etudiant/assignments'
  },
  {
    id: 'calendar',
    title: 'Calendrier',
    type: 'item',
    icon: 'event',
    url: '/etudiant/calendar'
  },
  {
    id: 'profile',
    title: 'Mon profil',
    type: 'item',
    icon: 'person',
    url: '/etudiant/profile'
  }
]; 