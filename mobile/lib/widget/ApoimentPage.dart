import 'package:flutter/material.dart';
import 'package:rendezvous/Service/UserService.dart';
import 'package:rendezvous/modele/user.dart';
import 'package:rendezvous/widget/AvailabilityPage%20.dart';

class ApoimentPage extends StatefulWidget {
  @override
  _ApoimentPageState createState() => _ApoimentPageState();
}

class _ApoimentPageState extends State<ApoimentPage> {
  late Future<List<User>> _professionnelsFuture;
  final UserService _userService = UserService();

  @override
  void initState() {
    super.initState();
    _professionnelsFuture = _userService.fetchAllProfessionnels();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Appointments'),
        backgroundColor: Colors.blue, // Matches the homepage
      ),
      backgroundColor: Colors.white, // You can use a consistent background color
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: FutureBuilder<List<User>>(
          future: _professionnelsFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              return Center(child: Text('No professionals found.'));
            } else {
              final professionnels = snapshot.data!;
              return ListView.builder(
                itemCount: professionnels.length,
                itemBuilder: (context, index) {
                  final user = professionnels[index];
                  return Card(
                    margin: EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Container(
                          width: double.infinity,
                          height: 200.0,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.vertical(top: Radius.circular(8.0)),
                            image: DecorationImage(
                              image: user.image.isNotEmpty
                                  ? (user.image.startsWith('http')
                                      ? NetworkImage(user.image)
                                      : AssetImage('assets/${user.image}') as ImageProvider)
                                  : AssetImage('assets/default_avatar.png') as ImageProvider,
                              fit: BoxFit.cover,
                            ),
                            border: Border.all(color: Colors.grey, width: 2),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${user.firstName} ${user.lastName}', // Affichez le prénom et le nom ici
                                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                              SizedBox(height: 8),
                              Text(
                                user.numeroTel,
                                style: TextStyle(fontSize: 14),
                              ),
                              SizedBox(height: 8),
                              Text(
                                user.email, // Affichez l'email ici
                                style: TextStyle(fontSize: 14, color: Colors.grey[700]),
                              ),
                              SizedBox(height: 8),
                              ElevatedButton(
                                onPressed: () {
                                  // Naviguez vers AvailabilityPage en passant l'ID de l'utilisateur
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => AvailabilityPage(
                                        professionnelId: user.professionnelId, // Passez l'ID de l'utilisateur
                                      ),
                                    ),
                                  );
                                },
                                child: Text('View Availability'),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              );
            }
          },
        ),
      ),
    );
  }
}
