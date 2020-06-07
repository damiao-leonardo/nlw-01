import Knex from "knex";

export async function seed(knex : Knex){
    await knex('items').del().then(function(){
    return knex('items').insert([
        {title : 'Lampadas', image: 'lampadas.svg'},
        {title : 'Pilhas e Baterias', image: 'baterias.svg'},
        {title : 'Papéis e Papelão', image: 'baterias.svg'},
        {title : 'Residuos Eletrônicos', image: 'baterias.svg'},
        {title : 'Residuos Orgânicos', image: 'baterias.svg'},
        {title : 'Óleo de cozinha', image: 'baterias.svg'}
     ]);
   })
 }
 
  