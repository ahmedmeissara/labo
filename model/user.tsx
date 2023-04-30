import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  numero_inventaire: Number,
  nom_commun: String,
  famille: String,
  genre: String,
  sous_genre: String,
  espece_et_sous_especes: String,
  auteurs: String,
  collecteurs_et_legataires: String,
  date_collecte: Date,
  localite: String,
  sexe: String,
  etat_de_conservation: String,
  nombre_especes: Number,
  remarques: String,
});

let Specimens : any;

try {
  Specimens = mongoose.model('Specimens', userSchema);
} catch {
  Specimens = mongoose.model('Specimens');
}

export default Specimens;
