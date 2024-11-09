import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./@layout/main/main.component').then((x) => x.MainComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./@components(page)/main/main.component').then((x) => x.MainComponent),
            }
        ]
    },
    {
        path: '**',
        loadComponent:()=> import('./@layout/not-found-404/not-found-404.component').then((x)=>x.NotFound404Component),
        title: "Sayfa Bulunamadı !"
    }
];
