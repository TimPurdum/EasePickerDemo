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

    #region Parameters
    /// <summary>
    ///     Toggles whether to collect a date range or a single date.
    /// </summary>
    [Parameter] 
    public bool CollectDateRange { get; set; }

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

    [Parameter] 
    public bool ReadOnly { get; set; } = true;

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

    [Parameter] 
    public bool ShowHeader { get; set; } = false;

    [Parameter] 
    public AmpPluginOptions? AmpConfig { get; set; }

    [Parameter] 
    public RangePluginOptions? RangeConfig { get; set; }

    [Parameter] 
    public EventCallback<DateTime> DateSelected { get; set; }

    [Parameter] 
    public EventCallback<DateRange> DateRangeSelected { get; set; }
    #endregion

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
                // create a new RangePluginOptions object if it doesn't exist
                RangeConfig ??= new RangePluginOptions();
                activePlugins.Add("RangePlugin");
            }
            else
            {
                RangeConfig = null;
            }

            // build the configuration object
            PickerConfig config = new(_pickerDiv!.Value, [CSS], (int)FirstDay, Language, Date,
                Columns, Months, ReadOnly, AutoApply, ZIndex, Inline, ShowHeader)
            {
                Plugins = activePlugins.ToArray(),
                AmpPlugin = AmpConfig,
                RangePlugin = RangeConfig
            };
            _easePick = await _jsModule.InvokeAsync<IJSObjectReference>("createPicker", config,
                _endDateDiv, DotNetObjectRef);
        }
    }


    /// <summary>
    ///     This event is raised when the user selects a single date.
    /// </summary>
    [JSInvokable]
    public async Task OnDateSelected(DateTime selectedDate)
    {
        await DateSelected.InvokeAsync(selectedDate);
    }

    /// <summary>
    ///     This method is called from the JS component when the user selects a date range.
    /// </summary>
    [JSInvokable]
    public async Task OnDateRangeSelected(DateTime startDate, DateTime endDate)
    {
        await DateRangeSelected.InvokeAsync(new DateRange(startDate, endDate));
    }

    /// <summary>
    ///     This is the DotNetObjectReference that will be passed to the JS component
    /// </summary>
    private DotNetObjectReference<EasyPicker> DotNetObjectRef => DotNetObjectReference.Create(this);


    #region Private Fields
    private ElementReference? _pickerDiv;
    private ElementReference? _endDateDiv;
    private IJSObjectReference? _jsModule;
    private IJSObjectReference? _easePick;
    #endregion
}