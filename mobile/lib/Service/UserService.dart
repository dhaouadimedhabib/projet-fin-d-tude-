import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:rendezvous/modele/user.dart';

class UserService {
  final String baseUrl = 'http://192.168.141.198:8084';

  Future<List<User>> fetchAllProfessionnels() async {
    final uri = Uri.parse('$baseUrl/api/user/professionnels');
    final response = await http.get(uri);

    if (response.statusCode == 200) {
      List<dynamic> jsonData = json.decode(response.body);
      
      // Débogage : imprimer les données JSON pour vérifier la structure
      print(jsonData);

      return jsonData.map((data) {
        try {
          return User.fromJson(data);
        } catch (e) {
          print('Error parsing user data: $e');
          return User(
            id: 0,
            professionnelId: 0, // Default value for professionnelId
            username: 'Unknown',
            email: 'Unknown',
            firstName: 'Unknown',
            lastName: 'Unknown',
            numeroTel: 'Unknown',
            image: '',
            roles: {},
          );
        }
      }).toList();
    } else {
      throw Exception('Failed to load professionnels');
    }
  }
}
