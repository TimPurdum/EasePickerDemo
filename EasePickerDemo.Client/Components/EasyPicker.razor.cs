using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace EasePickerDemo.Client.Components;

/// <summary>
///     Blazor wrapper around the EasePick JavaScript library.
///     https://easepick.com/
/// </summary>
public partial class EasyPicker
{
    [Inject] public required IJSRuntime JsRuntime { get; set; }

    /// <summary>
    ///     Toggles whether to collect a date range or a single date.
    /// </summary>
    [Parameter] public bool CollectDateRange { get; set; }

    /// <summary>
    ///     Pass a CSS file for picker.
    /// </summary>
    [Parameter]
    public string CSS { get; set; } = "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css";

    /// <summary>
    ///     Start day of the week. Defaults to Monday.
    /// </summary>
    [Parameter]
    public DayOfWeek FirstDay { get; set; } = DayOfWeek.Monday;

    /// <summary>
    ///     The language of the picker. Affects day names, month names, and plural rules.
    /// </summary>
    [Parameter]
    public string Language { get; set; } = "en-US";

    /// <summary>
    ///     The pre-selected date the picker should show.
    /// </summary>
    [Parameter]
    public DateTime? Date { get; set; }

    /// <summary>
    ///     The number of calendar columns. Default is 1.
    /// </summary>
    [Parameter]
    public int Columns { get; set; } = 1;

    /// <summary>
    ///     The number of months shown. Default is 1.
    /// </summary>
    [Parameter]
    public int Months { get; set; } = 1;

    [Parameter] public bool ReadOnly { get; set; } = true;

    /// <summary>
    ///     Hide the apply and cancel buttons, and automatically apply a new date range as soon as two dates are clicked.
    ///     Default is true.
    /// </summary>
    [Parameter]
    public bool AutoApply { get; set; } = true;

    /// <summary>
    ///     The Z-Index for the calendar, affects whether it will show on top of other controls.
    /// </summary>
    [Parameter]
    public int? ZIndex { get; set; }

    /// <summary>
    ///     Show the calendar inline.
    /// </summary>
    [Parameter]
    public bool Inline { get; set; } = false;

    [Parameter] public bool ShowHeader { get; set; } = false;

    [Parameter] public AmpPluginOptions? AmpConfig { get; set; }

    [Parameter] public RangePluginOptions? RangeConfig { get; set; }

    [Parameter] public EventCallback<DateTime> DateSelected { get; set; }

    [Parameter] public EventCallback<DateRange> DateRangeSelected { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (_easePick is null)
        {
            _jsModule ??= await JsRuntime.InvokeAsync<IJSObjectReference>("import", "./js/picker.js");

            List<string> activePlugins = [];
            if (AmpConfig is not null)
            {
                activePlugins.Add("AmpPlugin");
            }

            if (CollectDateRange)
            {
                RangeConfig ??= new RangePluginOptions();
                activePlugins.Add("RangePlugin");
            }
            else
            {
                RangeConfig = null;
            }

            PickerConfig config = new(_pickerDiv!.Value, [CSS], (int)FirstDay, Language, Date,
                Columns, Months, ReadOnly, AutoApply, ZIndex, Inline, ShowHeader)
            {
                Plugins = activePlugins.ToArray(),
                AmpPlugin = AmpConfig,
                RangePlugin = RangeConfig
            };
            _easePick = await _jsModule.InvokeAsync<IJSObjectReference>("createPicker", config,
                DotNetObjectRef, _endDateDiv);
        }
    }

    [JSInvokable]
    public async Task OnDateSelected(DateTime selectedDate)
    {
        Console.WriteLine($"Date {selectedDate.ToShortDateString()} selected");
        await DateSelected.InvokeAsync(selectedDate);
    }

    [JSInvokable]
    public async Task OnDateRangeSelected(DateTime startDate, DateTime endDate)
    {
        Console.WriteLine($"Range selected from {startDate.ToShortDateString()} to {endDate.ToShortDateString()}");
        await DateRangeSelected.InvokeAsync(new DateRange(startDate, endDate));
    }

    private ElementReference? _pickerDiv;
    private ElementReference? _endDateDiv;
    private IJSObjectReference? _jsModule;
    private IJSObjectReference? _easePick;
    private DotNetObjectReference<EasyPicker> DotNetObjectRef => DotNetObjectReference.Create(this);

}

public record PickerConfig(
        ElementReference Element,
        string[] Css,
        int FirstDay,
        string Lang,
        DateTime? Date,
        int Grid,
        int Calendars,
        bool ReadOnly,
        bool AutoApply,
        int? ZIndex,
        bool Inline,
        bool Header
    )
{
    [JsonPropertyName("AmpPlugin")] 
    public AmpPluginOptions? AmpPlugin { get; set; }

    [JsonPropertyName("RangePlugin")] 
    public RangePluginOptions? RangePlugin { get; set; }

    public required string[] Plugins { get; set; }
}

public record DateRange(DateTime StartDate, DateTime EndDate);

public record AmpPluginOptions
{
    public Dropdown? Dropdown { get; set; }
    public bool? ResetButton { get; set; }
}

/// <summary>
///    Enables month and year dropdowns in the calendar.
/// </summary>
public record Dropdown
{
    public int? MinYear { get; set; }
    public int? MaxYear { get; set; }
    public bool? Months { get; set; }
    public bool? Years { get; set; }
    public bool? YearsAscending { get; set; }
}

/// <summary>
///     Options for controlling the behavior of the range plugin.
/// </summary>
public record RangePluginOptions
{
    /// <summary>
    ///     Preselect start date.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public DateTime? StartDate { get; set; }

    /// <summary>
    ///     Present end date.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public DateTime? EndDate { get; set; }

    /// <summary>
    ///     If date range is already selected, then user can change only one of start date or end date (depends on clicked field) instead of new date range.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Repick { get; set; }

    /// <summary>
    ///     Disabling the option allows you to select an incomplete range.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Strict { get; set; }

    /// <summary>
    ///     Delimiter between dates. Default is " - ".
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Delimiter { get; set; }

    /// <summary>
    ///     Showing tooltip with how many days will be selected.
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? Tooltip { get; set; }

    /// <summary>
    ///     Text for the tooltip. Default: { one: 'day', other: 'days' }
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public RangeLocale? Locale { get; set; }
}

public record RangeLocale
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Zero { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? One { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Two { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Few { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Many { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Other { get; set; }
}