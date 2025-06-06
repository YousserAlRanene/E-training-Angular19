import { NavigationItem } from "./navigation";

 
export const FormateurNavigationItems: NavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/formateur/dashboard'
    },
    {
        id: 'courses',
        title: 'Mes cours',
        type: 'item',
        icon: 'book',
        url: '/formateur/courses'
    },
    {
        id: 'students',
        title: 'Mes étudiants',
        type: 'item',
        icon: 'people',
        url: '/formateur/students'
    },
    {
        id: 'assignments',
        title: 'Devoirs à corriger',
        type: 'item',
        icon: 'assignment',
        url: '/formateur/assignments'
    },
    {
        id: 'calendar',
        title: 'Calendrier',
        type: 'item',
        icon: 'event',
        url: '/formateur/calendar'
    },
    {
        id: 'profile',
        title: 'Mon profil',
        type: 'item',
        icon: 'person',
        url: '/formateur/profile'
    }
]; 