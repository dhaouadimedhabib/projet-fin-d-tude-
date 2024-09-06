import 'package:flutter/foundation.dart';

class Disponibilite {
  final int idDisponibilite;
  final String jour;
  final String heureDebut1;
  final String heureFin1;
  final String heureDebut2;
  final String heureFin2;
  final DateTime date;

  Disponibilite({
    required this.idDisponibilite,
    required this.jour,
    required this.heureDebut1,
    required this.heureFin1,
    required this.heureDebut2,
    required this.heureFin2,
    required this.date,
  });

  factory Disponibilite.fromJson(Map<String, dynamic> json) {
    return Disponibilite(
      idDisponibilite: json['idDisponibilite'],
      jour: json['jour'],
      heureDebut1: json['heureDebut1'],
      heureFin1: json['heureFin1'],
      heureDebut2: json['heureDebut2'],
      heureFin2: json['heureFin2'],
      date: DateTime.parse(json['date']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'idDisponibilite': idDisponibilite,
      'jour': jour,
      'heureDebut1': heureDebut1,
      'heureFin1': heureFin1,
      'heureDebut2': heureDebut2,
      'heureFin2': heureFin2,
      'date': date.toIso8601String(),
    };
  }
}
