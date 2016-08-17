class DashboardsShow extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    const { dashboard, queries, variable_params } = this.props

    return (
      <div>
        <div className="topbar">
          <div className="container">
            <div className="row" style={{paddingTop: "13px"}}>
              <div className="col-sm-9">
                <Nav />
                <h3>{dashboard.name}</h3>
              </div>
              <div className="col-sm-3 text-right">
                <a href={Routes.blazer_edit_dashboard_path(dashboard, variable_params)} className="btn btn-info">Edit</a>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginBottom: "60px"}}></div>
        <QueriesVariables onSubmit={this.handleSubmit} {...this.props} />
        {queries.map((query, i) => {
          return <DashboardQuery key={i} query={query} variable_params={variable_params} />
        })}
      </div>
    )
  }

  handleSubmit(variables) {
    window.location.href = Routes.blazer_dashboard_path(this.props.dashboard, variables)
  }
}


// <% if @data_sources.any? { |ds| ds.cache_mode != "off" } %>
//   <p class="text-muted" style="float: right;">
//     Some queries may be cached
//     <%= link_to "Refresh", refresh_dashboard_path(@dashboard, variable_params), method: :post %>
//   </p>
// <% end %>

// <% if @bind_vars.any? %>
//   <form id="bind" method="get" action="<%= dashboard_path(@dashboard, variable_params) %>" class="form-inline" style="margin-bottom: 10px;">
//     <% date_vars = ["start_time", "end_time"] %>
//     <% if (date_vars - @bind_vars).empty? %>
//       <% @bind_vars = @bind_vars - date_vars %>
//     <% else %>
//       <% date_vars = nil %>
//     <% end %>

//     <% @bind_vars.each_with_index do |var, i| %>
//       <%= label_tag var, var %>
//       <% if (data = @smart_vars[var]) %>
//         <%= select_tag var, options_for_select([[nil, nil]] + data, selected: params[var]), style: "margin-right: 20px; width: 200px; display: none;" %>
//         <script>
//           $("#<%= var %>").selectize({
//             create: true
//           });
//         </script>
//       <% else %>
//         <%= text_field_tag var, params[var], style: "width: 120px; margin-right: 20px;", autofocus: i == 0 && !var.end_with?("_at") && !params[var], class: "form-control" %>
//         <% if var.end_with?("_at") %>
//           <script>
//             $("#<%= var %>").daterangepicker({singleDatePicker: true, locale: {format: "YYYY-MM-DD"}});
//           </script>
//         <% end %>
//       <% end %>
//     <% end %>

//     <% if date_vars %>
//       <% date_vars.each do |var| %>
//         <%= hidden_field_tag var, params[var] %>
//       <% end %>

//       <%= label_tag nil, date_vars.join(" & ") %>
//       <div class="selectize-control single" style="width: 300px;">
//         <div id="reportrange" class="selectize-input" style="display: inline-block;">
//           <span>Select a time range</span>
//         </div>
//       </div>

//       <script>
//         var timeZone = "<%= Blazer.time_zone.tzinfo.name %>";
//         var format = "YYYY-MM-DD";
//         var now = moment.tz(timeZone);

//         function dateStr(daysAgo) {
//           return now.clone().subtract(daysAgo || 0, "days").format(format);
//         }

//         function toDate(time) {
//           return moment.tz(time.format(format), timeZone);
//         }

//         function setTimeInputs(start, end) {
//           $("#start_time").val(toDate(start).utc().format());
//           $("#end_time").val(toDate(end).endOf("day").utc().format());
//         }

//         $('#reportrange').daterangepicker(
//           {
//             ranges: {
//              "Today": [dateStr(), dateStr()],
//              "Last 7 Days": [dateStr(6), dateStr()],
//              "Last 30 Days": [dateStr(29), dateStr()]
//             },
//             locale: {
//               format: format
//             },
//             startDate: dateStr(29),
//             endDate: dateStr(),
//             opens: "left"
//           },
//           function(start, end) {
//             setTimeInputs(start, end);
//             submitIfCompleted($("#start_time").closest("form"));
//           }
//         ).on('apply.daterangepicker', function(ev, picker) {
//           setTimeInputs(picker.startDate, picker.endDate);
//           $('#reportrange span').html(toDate(picker.startDate).format('MMMM D, YYYY') + ' - ' + toDate(picker.endDate).format('MMMM D, YYYY'));
//         })

//         if ($("#start_time").val().length > 0) {
//           var picker = $("#reportrange").data('daterangepicker');
//           picker.setStartDate(moment.tz($("#start_time").val(), timeZone));
//           picker.setEndDate(moment.tz($("#end_time").val(), timeZone));
//           $("#reportrange").trigger('apply.daterangepicker', picker)
//         } else {
//           var picker = $("#reportrange").data('daterangepicker');
//           $("#reportrange").trigger('apply.daterangepicker', picker);
//           submitIfCompleted($("#start_time").closest("form"));
//         }
//       </script>
//     <% end %>
//   </form>
// <% end %>
