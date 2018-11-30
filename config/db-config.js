var mongoose = require('./../database');

CircuitSchema  = mongoose.Schema(
    {
      users:[Array],
      challenges:{
        object_gate: [String],
        location_gate: [String],
        id_users_completed: [Number]
      }
      time_started: Date,
      time_completed: Date,
      date_created: Date,
      date_deleted: Date,
      archived: Boolean,
      delete_in_ten_days: {
        delete: Boolean,
        start_delete: Date
        }
    },
    { collection: 'circuits' });
Circuit = mongoose.model('Circuit', CircuitSchema);

module.exports = Circuit;
