import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:rendezvous/modele/signup_request.dart';

// Service pour l'inscription
class SignupService {
  final String baseUrl = 'http://192.168.141.198:8084/api/auth'; // Remplacez par l'URL de base de votre API

  Future<MessageResponse> signUp(SignupRequest signupRequest) async {
    final url = Uri.parse('$baseUrl/signup');
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode(signupRequest.toJson());

    try {
      final response = await http.post(url, headers: headers, body: body);

      if (response.statusCode == 200) {
        return MessageResponse.fromJson(jsonDecode(response.body));
      } else {
        final errorResponse = jsonDecode(response.body);
        throw Exception('Erreur lors de l\'inscription: ${errorResponse['message']}');
      }
    } catch (e) {
      throw Exception('Erreur lors de l\'inscription: $e');
    }
  }
}

// Classe MessageResponse pour les réponses des requêtes
class MessageResponse {
  final String message;

  MessageResponse({required this.message});

  factory MessageResponse.fromJson(Map<String, dynamic> json) {
    return MessageResponse(message: json['message'] ?? '');
  }
}
