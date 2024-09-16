import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AuthService {
  final String baseUrl = 'http://192.168.141.198:8084/api/auth'; // Replace with your API base URL

  Future<JwtResponse> signIn(String username, String password) async {
    final url = Uri.parse('$baseUrl/signin');
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode(LoginRequest(username: username, password: password).toJson());

    final response = await http.post(url, headers: headers, body: body);

    if (response.statusCode == 200) {
      return JwtResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to sign in');
    }
  }
}

class LoginRequest {
  final String username;
  final String password;

  LoginRequest({required this.username, required this.password});

  Map<String, dynamic> toJson() {
    return {
      'username': username,
      'password': password,
    };
  }
}

class JwtResponse {
  final String accessToken;
  final int id;
  final String username;
  final int idProfessionnel;
  final List<String> roles;
  final String tokenType;

  JwtResponse({
    required this.accessToken,
    required this.id,
    required this.username,
    required this.idProfessionnel,
    required this.roles,
    required this.tokenType,
  });

  factory JwtResponse.fromJson(Map<String, dynamic> json) {
    return JwtResponse(
      accessToken: json['accessToken'] ?? '',
      id: json['id'] ?? 0,
      username: json['username'] ?? '',
      idProfessionnel: json['idProfessionnel'] ?? 0,
      roles: json['roles'] != null ? List<String>.from(json['roles']) : [],
      tokenType: json['tokenType'] ?? '',
    );
  }
}
