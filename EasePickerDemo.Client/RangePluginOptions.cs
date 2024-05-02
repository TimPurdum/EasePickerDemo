using System.Text.Json.Serialization;

namespace EasePickerDemo.Client;

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
