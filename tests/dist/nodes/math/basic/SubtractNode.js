"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../base");
class SubtractNode extends base_1.ShaderNode {
    generateCode() {
        return `${this.getOutputVarName(0)} = ${this.getInputValue(0)} - ${this.getInputValue(1)};`;
    }
}
exports.default = SubtractNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3VidHJhY3ROb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGVzL21hdGgvYmFzaWMvU3VidHJhY3ROb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXVFO0FBRXZFLE1BQXFCLFlBQWEsU0FBUSxpQkFBVTtJQUNoRCxZQUFZO1FBQ1IsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNoRyxDQUFDO0NBQ0o7QUFKRCwrQkFJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNoYWRlck5vZGUsIFNoYWRlclNsb3RUeXBlLCBTaGFkZXJTbG90IH0gZnJvbSBcIi4uLy4uLy4uL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YnRyYWN0Tm9kZSBleHRlbmRzIFNoYWRlck5vZGUge1xyXG4gICAgZ2VuZXJhdGVDb2RlICgpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRPdXRwdXRWYXJOYW1lKDApfSA9ICR7dGhpcy5nZXRJbnB1dFZhbHVlKDApfSAtICR7dGhpcy5nZXRJbnB1dFZhbHVlKDEpfTtgO1xyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=