import 'dart:convert';
import 'package:http/http.dart' as http;

class DisponibiliteService {
  final String apiUrl = "http://192.168.141.198:8084/api/Disponibilite/by-date";

  Future<List<String>> fetchDisponibilitesByDateAndProfessionnel(int professionnelId, String date) async {
    final response = await http.get(Uri.parse('$apiUrl/$professionnelId/$date'));

    if (response.statusCode == 200) {
      List<dynamic> body = json.decode(response.body);
      List<String> timeSlots = body.map((dynamic item) => item as String).toList();
      return timeSlots;
    } else {
      print('Failed to load disponibilites. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');
      throw "Failed to load disponibilites";
    }
  }
}
