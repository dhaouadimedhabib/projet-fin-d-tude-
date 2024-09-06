import 'package:flutter/material.dart';
import 'package:rendezvous/widget/ApoimentPage.dart';
import 'package:rendezvous/widget/InscriptionPage.dart';
import 'package:rendezvous/widget/LoginScreen.dart';
import 'package:rendezvous/widget/homepage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gestion des Rendez-vous',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: homepage(),
      routes: {
        '/login': (context) => LoginScreen(),
        '/inscription': (context) => InscriptionPage(),
        '/apoiment': (context) => ApoimentPage(),
      },
    );
  }
}
