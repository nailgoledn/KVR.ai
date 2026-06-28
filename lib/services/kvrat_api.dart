import 'dart:convert';
import 'package:http/http.dart' as http;

class KvratApi {
  final String baseUrl;

  KvratApi({this.baseUrl = 'http://localhost:4000'});

  Future<Map<String, dynamic>> generateBlueprint(String message) async {
    final response = await http.post(
      Uri.parse('$baseUrl/ai/generate'),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: jsonEncode({
        'message': message,
        'input': message,
      }),
    );

    if (response.statusCode >= 400) {
      throw Exception('API error: ${response.statusCode}');
    }

    return jsonDecode(response.body) as Map<String, dynamic>;
  }
}
