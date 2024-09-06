import 'package:flutter/material.dart';
import 'package:rendezvous/widget/ApoimentPage.dart';
import 'package:rendezvous/widget/InscriptionPage.dart';
import 'package:rendezvous/widget/LoginScreen.dart';

class homepage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Appointment Management'),
        backgroundColor: Colors.blue,
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text(
                'Menu',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              leading: Icon(Icons.login),
              title: Text('Login'),
              onTap: () {
                Navigator.pushNamed(context, '/login');
              },
            ),
            ListTile(
              leading: Icon(Icons.app_registration),
              title: Text('Sign Up'),
              onTap: () {
                Navigator.pushNamed(context, '/inscription');
              },
            ),
            ListTile(
              leading: Icon(Icons.calendar_today),
              title: Text('Appointments'),
              onTap: () {
                Navigator.pushNamed(context, '/apoiment');
              },
            ),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Welcome to your appointment management app',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            Expanded(
              child: ListView(
                children: [
                  _buildArticle(
                    'assets/image1.png',
                    'The Importance of Appointments',
                    'Appointments are crucial for managing time effectively and ensuring that both parties involved can plan their schedules efficiently. By setting appointments, individuals can prioritize their tasks and meet their commitments without conflicts.',
                  ),
                  _buildArticle(
                    'assets/image2.png',
                    'Organizing Your Schedule',
                    'Organizing appointments helps in creating a structured daily routine. By allocating specific times for different tasks, individuals can maintain productivity and reduce stress. Proper scheduling ensures that important tasks are not overlooked and helps in achieving work-life balance.',
                  ),
                  _buildArticle(
                    'assets/image3.png',
                    'How Appointments Enhance Professionalism',
                    'Having a well-organized appointment system reflects professionalism and reliability. It shows that you value the time of others and are committed to fulfilling your obligations. A structured appointment system can improve communication and foster positive relationships in both personal and professional settings.',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildArticle(String imagePath, String title, String description) {
    return Card(
      margin: EdgeInsets.only(bottom: 16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Image.asset(
            imagePath,
            fit: BoxFit.cover,
            height: 200,
            width: double.infinity,
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              title,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Text(description),
          ),
        ],
      ),
    );
  }
}

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Appointment Management',
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
