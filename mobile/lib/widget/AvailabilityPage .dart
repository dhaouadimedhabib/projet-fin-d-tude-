import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:rendezvous/Service/DisponibiliteService.dart';

class AvailabilityPage extends StatefulWidget {
  final int professionnelId;

  AvailabilityPage({required this.professionnelId});

  @override
  _AvailabilityPageState createState() => _AvailabilityPageState();
}

class _AvailabilityPageState extends State<AvailabilityPage> {
  late Future<List<String>> _timeSlotsFuture;
  final DisponibiliteService _disponibiliteService = DisponibiliteService();
  late int professionnelId;
  DateTime _selectedDate = DateTime.now(); // Current date as initial value

  @override
  void initState() {
    super.initState();
    professionnelId = widget.professionnelId;
    _fetchDisponibilites();
  }

  void _fetchDisponibilites() {
    _timeSlotsFuture = _disponibiliteService.fetchDisponibilitesByDateAndProfessionnel(
      professionnelId,
      '${_selectedDate.toLocal().toIso8601String().split('T').first}', // Format YYYY-MM-DD
    );
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Availability'),
        backgroundColor: Colors.blue, // Consistent with the homepage
      ),
      backgroundColor: Colors.white, // Consistent background color
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TableCalendar(
              focusedDay: _selectedDate,
              firstDay: DateTime(2000),
              lastDay: DateTime(2101),
              selectedDayPredicate: (day) => isSameDay(day, _selectedDate),
              onDaySelected: (selectedDay, focusedDay) {
                setState(() {
                  _selectedDate = selectedDay;
                  _fetchDisponibilites();
                });
              },
              headerStyle: HeaderStyle(
                formatButtonVisible: false,
                titleCentered: true,
                decoration: BoxDecoration(
                  color: Colors.blue,
                ),
                titleTextStyle: TextStyle(color: Colors.white),
              ),
              calendarStyle: CalendarStyle(
                todayDecoration: BoxDecoration(
                  color: Colors.blueAccent,
                  shape: BoxShape.circle,
                ),
                selectedDecoration: BoxDecoration(
                  color: Colors.blue,
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Selected Date: ${_selectedDate.toLocal().toString().split(' ')[0]}',
              style: TextStyle(fontSize: 16),
            ),
          ),
          Expanded(
            child: FutureBuilder<List<String>>(
              future: _timeSlotsFuture,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return Center(child: Text('Error: ${snapshot.error}'));
                } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                  return Center(child: Text('No available time slots.'));
                } else {
                  final timeSlots = snapshot.data!;
                  return ListView.builder(
                    itemCount: (timeSlots.length / 2).ceil(),
                    itemBuilder: (context, index) {
                      final firstIndex = index * 2;
                      final secondIndex = firstIndex + 1;
                      final firstTimeSlot = timeSlots.length > firstIndex ? timeSlots[firstIndex] : null;
                      final secondTimeSlot = timeSlots.length > secondIndex ? timeSlots[secondIndex] : null;

                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            if (firstTimeSlot != null)
                              Expanded(
                                child: ElevatedButton(
                                  onPressed: () {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(content: Text('Selected time slot: $firstTimeSlot')),
                                    );
                                  },
                                  child: Text(firstTimeSlot),
                                ),
                              ),
                            SizedBox(width: 8),
                            if (secondTimeSlot != null)
                              Expanded(
                                child: ElevatedButton(
                                  onPressed: () {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(content: Text('Selected time slot: $secondTimeSlot')),
                                    );
                                  },
                                  child: Text(secondTimeSlot),
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
        ],
      ),
    );
  }
}
